import { useRef, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
export default function Signup() {
    const { control, handleSubmit, getValues } = useForm();
    const [msg, setMsg] = useState('')
    async function handle() {
        console.log(getValues())
        const resp = await fetch('http://localhost:3000/api/userInsert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getValues())
        })
    }
    return (
        <div>
            <div>bar app</div>
            <div>{msg}</div>
            <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} placeholder="firstname" />}
            />
            <Controller
                name="lastname"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} placeholder="lastname" />}
            />
            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} placeholder="email" />}
            />
            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} placeholder="password" />}
            />
            <Button onClick={handle}>New User</Button>
        </div>
    );
}
