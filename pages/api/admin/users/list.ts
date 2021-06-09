import { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../../../util/mongodb'
import Users from '../../../../models/users'
import { api } from '../../../../util/api.list'

export default api(Users)
// export default async function ListUsers(req: NextApiRequest, res: NextApiResponse) {
//     await dbConnect()
//     const { skip=0, limit=25 } = req.body
//     // console.log(req.body)
//     const users = await Users.find().limit(limit).skip(skip)
//     //     .limit(limit)
//     //     .skip(skip)
//     // .skip((page - 1) * limit)
//     // console.log(users)
//     res.status(201).json(users)
// }