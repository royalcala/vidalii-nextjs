import { compare } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import dbManager from '../../../../util/dbManager'
import dbAdmin from '../../../../util/dbAdmin'
import Users from '../../../../models/admin/users'
import { AUTH } from "../../../../util/getCookies";
import { Jwt, SECRET } from '../../../../util/auth'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const conn = await dbManager()

  // await dbConnect()
  if (req.method === 'POST') {
    const company = await conn.models.companies.findOne({ seq: req.body.company_seq })

    // const user = await Users.findOne({
    //   email: req.body.email
    // })
    // res.json({ company, user })
    // // console.log(user)
    //   compare(req.body.password, user.password, function (err, result) {
    //     if (!err && result) {
    //       const claims: Jwt = { _id: user._id,company_seq:1 };
    //       const jwt = sign(claims, SECRET, { expiresIn: '1d' });

    //       res.setHeader('Set-Cookie', cookie.serialize(AUTH, jwt, {
    //         // httpOnly: true,
    //         // secure: process.env.NODE_ENV !== 'development',
    //         // sameSite: 'strict',
    //         maxAge: 86400,//1d
    //         path: '/',
    //       }))
    //       res.json({ success: true, message: 'Welcome back to the app!' });
    //     } else {
    //       res.json({ success: false, message: 'Ups, something went wrong!.'+err });
    //     }
    //   })
    // } else {
    //   res.status(405).json({ success: false, message: 'We only support POST' });
  }
}
