import { compare, hash } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import dbManager from '../../../../util/dbManager'
import dbAdmin from '../../../../util/dbAdmin'
import { Users } from '../../../../entities/admin/Users'
import { Companies } from '../../../../entities/manager/Companies'
import { AUTH } from "../../../../util/getCookies";
import { Jwt, SECRET } from '../../../../util/auth'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  // const conn = await dbManager()
  // await dbConnect()
  if (req.method === 'POST') {
    const { id_company, email, password } = req.body
    const orm = await dbManager.getConn()
    const company = await orm.em.findOne(Companies, id_company) as Companies
    const ormAdmin = await dbAdmin.getConn(company)
    const user = await ormAdmin?.em.findOne(Users, { email: email }) as Users
    // console.log({ user, company })
    compare(password, user.password, function (err, result) {
      if (!err && result) {
        const claims: Jwt = { user, company };
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
        console.log(err, result)
        res.json({ success: false, message: 'Ups, something went wrong!.' + err });
      }
    })
  }
  else
    res.status(405).json({ success: false, message: 'We only support POST' });

}
