import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import dbConnect from './mongodb'
import mongoose from 'mongoose'
// import Users from '../../../../models/users'
export const api = (model: mongoose.Model<any>) => async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect()
    const { skip = 0, limit = 25, filter = {} } = req.body
    // console.log(req.body)
    const data = await model.find(filter).limit(limit).skip(skip)
    //     .limit(limit)
    //     .skip(skip)
    // .skip((page - 1) * limit)
    // console.log(users)
    res.status(201).json(data)
}

export const initialDocs = (model: mongoose.Model<any>) => async (context: GetServerSidePropsContext) => {
    await dbConnect()
    const data = await model.find().limit(25)
    // .skip((page - 1) * limit)
    // .exec();
    // console.log(users)
    const total = await model.countDocuments();
    // .limit(1)
    // .skip((page - 1) * limit)
    // .exec();
    return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
            total
        }
    }
}