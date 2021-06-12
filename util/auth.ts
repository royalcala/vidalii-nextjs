import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getCookies } from './getCookies'
import { verify } from 'jsonwebtoken';
import dbConnect from './db'
import Users, { Definition as UserDefinition } from '../models/users'
export const SECRET = process.env.SECRET || 'MySecret1*'
export type Jwt = {
    _id: string
}
export const ValidateAccessPolicy = async (context: GetServerSidePropsContext | { req: NextApiRequest, res: NextApiResponse }, accessPolicy: string) => {
    await dbConnect()
    const cookies = getCookies(context.req)
    try {
        const decoded = verify(cookies.AUTH, SECRET) as Jwt        
        const user = await Users.findById(decoded._id)
        if (user?.admin !== true) {
            const found = user.groups.find((value: string) => value === accessPolicy)
            if (!found)
                return false
        }
        return decoded
    } catch (err) {
        //error in verify()
        return false
    }
}