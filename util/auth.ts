import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getCookies } from './getCookies'
import { verify } from 'jsonwebtoken';
import dbAdmin from './dbAdmin'
import { Companies } from "../entities/manager/Companies";
import { Users } from '../entities/admin/Users'
import { EntityName } from "@mikro-orm/core";
// import Users from '../models/admin/users'
export const SECRET = process.env.SECRET as string
export type Jwt = {
    user: Omit<Users, 'password'>,//user id 
    company: Companies
}

export const ValidateAccessPolicy = async (
    context: GetServerSidePropsContext | { req: NextApiRequest, res: NextApiResponse },
    accessPolicy: string
) => {
    const cookies = getCookies(context.req)
    try {
        const decoded = verify(cookies.AUTH, SECRET) as Jwt
        const conn = await dbAdmin.getConn(decoded.company)
        const user = await conn?.em.findOne(Users, decoded.user.id)
        if (user?.admin !== true) {
            const found = user?.groups.find((value: string) => value === accessPolicy)
            if (!found)
                return false
        }
        return decoded
    } catch (err) {
        //error in verify()
        return false
    }
}