import { useRef, useState } from 'react';
// import { useRouter } from 'next/router'

export default function Login() {
    // const router = useRouter()
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<any>();
    async function handleLogin() {
        const resp = await fetch('/api/admin/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailRef.current?.value,
                password: passRef.current?.value
            })
        });
        const json = await resp.json();
        if (json.success === true)
            window.location.reload();
        else
            setMessage(json.message);
    }
    return (
        <div>
            {JSON.stringify(message)}
            <input type="text" placeholder="email" ref={emailRef} />
            <input type="password" placeholder="password" ref={passRef} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
