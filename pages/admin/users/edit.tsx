import React from 'react';
import dbConnect from '../../../util/mongodb'
import Users from '../../../models/users'
import { GetServerSidePropsContext } from 'next'
import { useForm, Controller } from "react-hook-form";
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Admin from "../../../components/Admin";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import cookie from 'cookie';

export const accessGroup = "admin.users.edit"
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
        buttons: {
            '& button': {
                marginRight: theme.spacing(1)
            }
            // marginRight:theme.spacing(1)
        }
    }),
);

export default function EditUser(props: { user: any }) {
    const classes = useStyles();
    const { control, handleSubmit, getValues } = useForm();
    const [progress, setProgress] = React.useState(false)
    const [dialog, setDialog] = React.useState(false)
    const [msgDialog, setMsgDialog] = React.useState("")
    async function onSubmit(data: any) {
        // getValues()
        setProgress(true)
        data._id = props.user._id
        const resp = await fetch('/api/admin/users/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const json = await resp.json();
        setProgress(false)
        if (json.success === true)
            setMsgDialog("User Saved")
        else
            setMsgDialog("error:" + json.msg)
        setDialog(true)
    }
    return (
        <Admin breadcrumb={{ page1: "Users", page2: "Edit User" }} progress={progress} login={true}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} className={classes.buttons}>
                        <Button type="submit" variant="contained" color="primary">Save User</Button>
                        <Button variant="contained" color="primary">Reset Password</Button>
                    </Grid>
                    <Grid item>
                        <Controller
                            name="firstname"
                            control={control}
                            defaultValue={props.user.firstname}
                            rules={{ required: 'Firstname required' }}
                            render={({ field, fieldState: { error } }) => <TextField
                                {...field}
                                label="firstname"
                                className={classes.textField}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />}
                        />
                        <Controller
                            name="lastname"
                            control={control}
                            defaultValue={props.user.lastname}
                            rules={{ required: "Lastname required" }}
                            render={({ field, fieldState: { error } }) => <TextField
                                {...field} label="lastname" className={classes.textField}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue={props.user.email}
                            rules={{
                                required: "Email required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Enter a valid e-mail address",
                                },
                            }}
                            render={({ field, fieldState: { error } }) => <TextField
                                {...field} label="email" className={classes.textField} type="email"
                                error={!!error}
                                helperText={error ? error.message : null}
                            />}
                        />
                        {/* <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Password required" }}
                            render={({ field, fieldState: { error } }) => <TextField
                                {...field} label="password" className={classes.textField} type="password"
                                error={!!error}
                                helperText={error ? error.message : null}
                            />}
                        /> */}
                    </Grid>
                </Grid>
            </form>
            <Dialog
                open={dialog}
                onClose={() => setDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{msgDialog}</DialogTitle>
            </Dialog>

        </Admin>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    await dbConnect()
    console.log(cookie.parse(context.req.headers.cookie || ''))
    const user = await Users.findById(context.query._id)
    return {
        props: {
            user: JSON.parse(JSON.stringify(user))
        }
    }
}