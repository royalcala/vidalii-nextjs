import { compare } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import dbManagerConnect from '../../../../util/dbManager'
import dbConnect from '../../../../util/db'
import Users from '../../../../models/users'
import { AUTH } from "../../../../util/getCookies";
import { Jwt, SECRET } from '../../../../util/auth'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await dbManagerConnect()
  await dbConnect()
  if (req.method === 'POST') {
    const user = await Users.findOne({
      email: req.body.email
    })
    // console.log(user)
    compare(req.body.password, user.password, function (err, result) {
      if (!err && result) {
        const claims: Jwt = { _id: user._id };
        const jwt = sign(claims, SECRET, { expiresIn: '1d' });

        res.setHeader('Set-Cookie', cookie.serialize(AUTH, jwt, {
          // httpOnly: true,
          // secure: process.env.NODE_ENV !== 'development',
          // sameSite: 'strict',
          maxAge: 86400,//1d
          path: '/',
        }))
        res.json({ success: true, message: 'Welcome back to the app!' });
      } else {
        res.json({ success: false, message: 'Ups, something went wrong!.'+err });
      }
    })
  } else {
    res.status(405).json({ success: false, message: 'We only support POST' });
  }
}
