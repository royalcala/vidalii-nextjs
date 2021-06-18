import { NextApiRequest, NextApiResponse } from "next";
import { Jwt, ValidateAccessPolicy } from "./auth";
import { EntityClass } from '@mikro-orm/core/typings'
import dbAdmin from "./dbAdmin";

export const apiPersistData = <T>(opt: {
    accessPolicy: string,
    entity: EntityClass<any>,
    beforePersist?: (entity: any) => Promise<void>,
    cascade?: [string, EntityClass<any>][]
}) => async (req: NextApiRequest, res: NextApiResponse) => {
    const access = await ValidateAccessPolicy({ req, res }, opt.accessPolicy)
    if (!access)
        res.status(401).json({ success: false, msg: 'You dont have access' })
    const jwt = access as Jwt
    const conn = await dbAdmin.getConn(jwt.company)
    //@ts-ignore
    const user = conn.em.assign(new opt.entity(), req.body)
    // const errors = validateSync(user)
    // if (errors.length > 0)
    //     res.json({ success: false, errors })
    // user.password = await hash(user.password, 10)
    // await conn.em.persistAndFlush(user)
    // res.status(201).json({ success: true, data: user })
}

export const apiUpdateData = (req: NextApiRequest, res: NextApiResponse) => {

}