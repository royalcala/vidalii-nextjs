import { NextApiRequest, NextApiResponse } from "next";
import { Jwt, ValidateAccessPolicy } from "./auth";
import { EntityClass } from '@mikro-orm/core/typings'
import dbAdmin from "./dbAdmin";
import { validateSync } from 'class-validator';

export const apiPersistData = <T>(opt: {
    accessPolicy: string,
    entity: EntityClass<any>,
    beforePersist?: (entity: any) => Promise<void>,
    cascade?: [string, EntityClass<any>][]
}) => async (req: NextApiRequest, res: NextApiResponse) => {
    const access = await ValidateAccessPolicy({ req, res }, opt.accessPolicy)
    if (!access)
        res.status(401).json({ success: false, msg: 'You dont have access' })
    else {
        const jwt = access as Jwt
        const conn = await dbAdmin.getConn(jwt.company)
        //@ts-ignore
        const data = conn.em.assign(new opt.entity(), req.body)
        if (opt?.beforePersist)
            await opt.beforePersist(data)
        const errors = validateSync(data)
        if (errors?.length > 0)
            res.json({ success: false, errors })
        else {
            await conn.em.persistAndFlush(data)
            res.status(201).json({ success: true, data })
        }
    }
}

export const apiUpdateData = (req: NextApiRequest, res: NextApiResponse) => {

}