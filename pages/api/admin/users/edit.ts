import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../util/mongodb'
import Users from '../../../../models/users'


export default async function newUser(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    const user = req.body
    console.log(user)
    const result = await Users.updateOne({ _id: user._id }, user);
    res.json({success:true,msg:''})
}