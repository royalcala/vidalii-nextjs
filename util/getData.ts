import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import dbConnect from './db'
import mongoose from 'mongoose'
import { ValidateAccessPolicy } from './auth'
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
export type PropsFindMany = {
    data: any[],
    total: number,
    access: boolean
}

export const findMany = (model: mongoose.Model<any>, limit: number, accessPolicy: string) => async (context: GetServerSidePropsContext) => {
    await dbConnect()
    const access = await ValidateAccessPolicy(context, accessPolicy)
    if (access === false)
        return {
            props: {
                access
            }
        }
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
            access: true
        }
    }
}

export type PropsFindOneById = {
    data: any,
    access: boolean
}

export const findOneById = (model: mongoose.Model<any>, accessPolicy: string) => async (context: GetServerSidePropsContext) => {
    await dbConnect()
    const access = await ValidateAccessPolicy(context, accessPolicy)
    if (access === false)
        return {
            props: {
                access
            }
        }
    const data = await model.findById(context.query._id)
    return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
            access
        }
    }
}