import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../util/mongodb'
import { hash } from 'bcrypt';
import Users from '../../../../models/users'


export default async function newUser(req: NextApiRequest, res: NextApiResponse) {
    //TODO check cookie auth is a valid jwt
    await dbConnect()
    const user = req.body

    hash(user.password, 10, async function (err, hash) {
        // Store hash in your password DB.
        user.password = hash
        const schema = new Users(user)//returns only the schema
        try {
            const result = await schema.save();//returns all with _id            
            res.status(201).json({ success: true, result })

        } catch (err) {
            console.log(err.message)
            res.status(400).json({ sucess: false, result: null, msg: err.message })
        }
        // const data = await Users.create(user)
        // const response = await db.collection("users").insertOne(user)
        // res.json(response)
        // const statement = await db.prepare(
        //     'INSERT INTO person (name, email, password) values (?, ?, ?)'
        // );
        // const result = await statement.run(req.body.name, req.body.email, hash);
        // result.finalize();

        // const person = await db.all('select * from person');
        // res.json(person);
    });
}