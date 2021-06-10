import { compare } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../util/mongodb'
import Users from '../../../../models/users'

export const SECRET = process.env.SECRET || 'MySecret1*'
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  if (req.method === 'POST') {
    const person = await Users.findOne({
      email: req.body.email
    })
    compare(req.body.password, person.password, function (err, result) {
      if (!err && result) {
        const claims = { sub: person.id, myPersonEmail: person.email };
        const jwt = sign(claims, SECRET, { expiresIn: '1d' });
       
        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
          // httpOnly: true,
          // secure: process.env.NODE_ENV !== 'development',
          // sameSite: 'strict',
          maxAge: 86400,//1d
          path: '/',
        }))
        res.json({ success: true, message: 'Welcome back to the app!' });
      } else {
        res.json({ success: false, message: 'Ups, something went wrong!' });
      }
    })
  } else {
    res.status(405).json({ success: false, message: 'We only support POST' });
  }
}
