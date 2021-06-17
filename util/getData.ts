import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import dbAdmin from './dbAdmin'
import { EntityName } from '@mikro-orm/core'
import { Jwt, ValidateAccessPolicy } from './auth'
export const apiFindMany = (
    entity: EntityName<any>,
    accessPolicy: string,
) => async (req: NextApiRequest, res: NextApiResponse) => {
    const access = await ValidateAccessPolicy({ req, res }, accessPolicy)
    if (access === false) {
        res.status(401).json({ success: false, msg: 'You dont have access' })
    } else {
        const { offset = null, limit = null, filter = {}, populate = [] } = req.body
        const conn = await dbAdmin.getConn(access.company)
        const opt = {} as any
        opt.populate = populate
        if (offset)
            opt.offset = offset
        if (limit)
            opt.limit = limit
        //you need to send limit and offset together for offeset works
        const data = await conn.em.find(entity, filter, opt)
        res.status(201).json(data)
    }
}
export type PropsFindMany = {
    data: any[],
    total: number,
    access: boolean
}

export const serverPropsfindMany = (
    entity: EntityName<any>,
    accessPolicy: string,
    options: {
        limit?: number,
        populate?: string[],
        offset?: number //skip
    }) => async (context: GetServerSidePropsContext) => {
        // await dbConnect()
        const access = await ValidateAccessPolicy(context, accessPolicy)
        if (access === false)
            return {
                props: {
                    access
                }
            }

        const conn = await dbAdmin.getConn(access.company)
        const elements = await conn.em.find(entity, {}, options)
        // await model.find().limit(limit)
        // .skip((page - 1) * limit)
        // .exec();
        // console.log(users)
        const total = await conn.em.count(entity)
        // const total = await model.countDocuments();
        // .limit(1)
        // .skip((page - 1) * limit)
        // .exec();
        return {
            props: {
                data: JSON.parse(JSON.stringify(elements)),
                total,
                access: true
            }
        }
    }

export type PropsFindOneById = {
    data: any,
    access: boolean
}

// export const findOneById = (model: mongoose.Model<any>, accessPolicy: string) => async (context: GetServerSidePropsContext) => {
//     // await dbConnect()
//     const access = await ValidateAccessPolicy(context, accessPolicy)
//     if (access === false)
//         return {
//             props: {
//                 access
//             }
//         }
//     const data = await model.findById(context.query._id)
//     return {
//         props: {
//             data: JSON.parse(JSON.stringify(data)),
//             access
//         }
//     }
// }