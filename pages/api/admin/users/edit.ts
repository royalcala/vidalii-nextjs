import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../util/mongodb'
import Users from '../../../../models/users'
import { hash } from 'bcrypt';

export default async function editUser(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    const user = req.body
    console.log('api:',user)
    if (user?.password) {
        const hashPassword = await hash(user.password, 10);
        user.password = hashPassword
    }
    const result = await Users.updateOne({ _id: user._id }, user);
    res.json({ success: true, msg: '' })
}