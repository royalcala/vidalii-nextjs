import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../util/mongodb'
import Users from '../../../../models/users'

export default async function ListUsers(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    const { skip, limit } = req.body
    const users = await Users.find()
        .limit(limit)
    // .skip((page - 1) * limit)
}