import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getCookies } from './getCookies'
import { verify } from 'jsonwebtoken';
import dbAdmin from './dbAdmin'
// import Users from '../models/admin/users'
export const SECRET = process.env.SECRET as string
export type Jwt = {
    _id: string,
    seq: number,
    uri: string
}
export const ValidateAccessPolicy = async (context: GetServerSidePropsContext | { req: NextApiRequest, res: NextApiResponse }, accessPolicy: string) => {
    const cookies = getCookies(context.req)
    // await dbAdmin()
    try {
        const decoded = verify(cookies.AUTH, SECRET) as Jwt
        const users = await dbAdmin.getModel('users', decoded)
        const user = await users.findById(decoded._id)
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