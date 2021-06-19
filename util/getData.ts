import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import dbAdmin from './dbAdmin'
import { EntityName } from '@mikro-orm/core'
import { Jwt, ValidateAccessPolicy } from './auth'
import { EntityClass } from '@mikro-orm/core/typings'
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
    access: boolean,
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

export type ServerPropsFindById<T, TOther=any> = {
    data: T,
    access: boolean,
    otherData: TOther
}
export const serverPropsFindById = (opt: {
    accessPolicy: string,
    entity: EntityClass<any>,
    otherData?: (data: any) => Promise<any>
}) => async (context: GetServerSidePropsContext) => {
    const access = await ValidateAccessPolicy(context, opt.accessPolicy)
    if (access === false)
        return {
            props: {
                data: null,
                otherData: null,
                access
            }
        }
    const jwt = access as Jwt
    const conn = await dbAdmin.getConn(jwt.company)
    const props = {
        data: null,
        otherData: null,
        access: true
    }
    let one = await conn.em.findOne(opt.entity, context.query.id)
    if (opt?.otherData) {
        let data = await opt.otherData(one)
        props.otherData = JSON.parse(JSON.stringify(data))
    }
    props.data = JSON.parse(JSON.stringify(one))
    return { props }

}