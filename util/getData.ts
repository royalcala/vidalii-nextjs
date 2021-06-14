import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import dbAdmin from './dbAdmin'
import mongoose from 'mongoose'
import { Jwt, ValidateAccessPolicy } from './auth'
export const apiFindMany = (modelName: string, accessPolicy: string) => async (req: NextApiRequest, res: NextApiResponse) => {
    // await dbConnect()
    const access = await ValidateAccessPolicy({ req, res }, accessPolicy)
    if (access === false)
        res.status(401).json({ success: false, msg: 'You dont have access' })
    const { skip = 0, limit = 25, filter = {} } = req.body
    
    const model = await dbAdmin.getModel(modelName, access as Jwt)
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

export const findMany = (modelName: string, limit: number, accessPolicy: string) => async (context: GetServerSidePropsContext) => {
    // await dbConnect()
    const access = await ValidateAccessPolicy(context, accessPolicy)
    if (access === false)
        return {
            props: {
                access
            }
        }
    const model = await dbAdmin.getModel(modelName, access)
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
    // await dbConnect()
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