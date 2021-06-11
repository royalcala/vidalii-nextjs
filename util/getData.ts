import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import dbConnect from './mongodb'
import mongoose from 'mongoose'
import {   getCookies } from './getCookies'
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
export type PropsInitialDocs = {
    data: any[],
    total: number,
    restricted: null | JSX.Element
}

export const initialDocs = (model: mongoose.Model<any>, limit: number) => async (context: GetServerSidePropsContext) => {
    // getCookies(context).AUTH
    await dbConnect()
    const data = await model.find().limit(limit)
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
            total,
            restricted: true
        }
    }
}