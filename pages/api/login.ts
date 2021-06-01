import { compare } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../util/mongodb'
// import sqlite from 'sqlite';
// import { secret } from '../../../api/secret';
const secret = process.env.SECRET || 'MySecret1*'
export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase()
    if (req.method === 'POST') {
        const person = await db.collection("users").findOne({
            email: req.body.email
        })
        console.log(person)
        res.json({
            person,
            email:req.body.email
        })
        compare(req.body.password, person.password, function(err, result) {
          if (!err && result) {
            const claims = { sub: person.id, myPersonEmail: person.email };
            const jwt = sign(claims, secret, { expiresIn: '1d' });

            res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              sameSite: 'strict',
              maxAge: 3600,
              path: '/'
            }))
            res.json({message: 'Welcome back to the app!'});
          } else {
            res.json({ message: 'Ups, something went wrong!' });
          }
        })
    } else {
        res.status(405).json({ message: 'We only support POST' });
    }
}
