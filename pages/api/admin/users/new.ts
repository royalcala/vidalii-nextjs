import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import dbAdmin from '../../../../util/dbAdmin'
import { Users } from '../../../../entities/admin/Users'
import { Jwt, ValidateAccessPolicy } from '../../../../util/auth';
import { validateSync } from 'class-validator';

export const accessPolicy = 'api_admin_users_new'
export default async function newUser(req: NextApiRequest, res: NextApiResponse) {
    const access = await ValidateAccessPolicy({ req, res }, accessPolicy)
    if (!access)
        res.status(401).json({ success: false, msg: 'You dont have access' })
    const jwt = access as Jwt
    const conn = await dbAdmin.getConn(jwt.company)
    const user = conn.em.assign(new Users(), req.body)
    const errors = validateSync(user)
    if (errors.length > 0)
        res.json({ success: false, errors })
    user.password = await hash(user.password, 10)
    await conn.em.persistAndFlush(user)
    res.status(201).json({ success: true, data: user })
}