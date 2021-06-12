import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRef, useState } from 'react';
import { useForm, Controller } from "react-hook-form";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Vidalii
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();
    const { control, handleSubmit, getValues } = useForm();
    const [message, setMessage] = useState<any>();
    async function onSubmit(credentials: any) {
        const resp = await fetch('/api/admin/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const json = await resp.json();
        if (json.success === true)
            window.location.reload();
        else
            setMessage(json.message);
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {message}
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="Company"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Company required' }}
                        render={({ field, fieldState: { error } }) => <TextField
                            {...field}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Company"
                            autoFocus
                            // className={classes.textField}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Email required' }}
                        render={({ field, fieldState: { error } }) => <TextField
                            {...field}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Email"
                            autoFocus
                            // className={classes.textField}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Password required' }}
                        render={({ field, fieldState: { error } }) => <TextField
                            {...field}
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Password"
                            autoFocus
                            // className={classes.textField}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />}
                    />
                    {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    // onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

// import { useRef, useState } from 'react';

// export default function Login() {
//     const emailRef = useRef<HTMLInputElement>(null);
//     const passRef = useRef<HTMLInputElement>(null);
//     const [message, setMessage] = useState<any>();
//     async function handleLogin() {
//         const resp = await fetch('/api/admin/session/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 email: emailRef.current?.value,
//                 password: passRef.current?.value
//             })
//         });
//         const json = await resp.json();
//         if (json.success === true)
//             window.location.reload();
//         else
//             setMessage(json.message);
//     }
//     return (
//         <div>
//             {JSON.stringify(message)}
//             <input type="text" placeholder="email" ref={emailRef} />
//             <input type="password" placeholder="password" ref={passRef} />
//             SignIn       <button onClick={handleLogin}>Login</button>
//         </div>
//     );
// }
