import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../util/mongodb'
import { hash } from 'bcrypt';
export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase()
    const user = req.body

    hash(user.password, 10, async function (err, hash) {
        // Store hash in your password DB.
        user.password = hash
        const response = await db.collection("users").insertOne(user)
        res.json(response)
        // const statement = await db.prepare(
        //     'INSERT INTO person (name, email, password) values (?, ?, ?)'
        // );
        // const result = await statement.run(req.body.name, req.body.email, hash);
        // result.finalize();

        // const person = await db.all('select * from person');
        // res.json(person);
    });
}