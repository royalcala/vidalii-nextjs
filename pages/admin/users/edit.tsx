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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getAccessPolicies } from "../../api/admin/session/accessPolicies";
import { ValidateAccessPolicy } from '../../../util/auth';

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
export const accessPolicy = "admin_users_edit"
export default function EditUser(props: { access: boolean, user: any, accessPolicies: { api: string[], admin: string[] } }) {
    const classes = useStyles();
    const { control, handleSubmit, getValues } = useForm();
    const [progress, setProgress] = React.useState(false)
    const [dialog, setDialog] = React.useState(false)
    const [msgDialog, setMsgDialog] = React.useState("")
    // const [adminCheck, setAdminCheck] = React.useState(props.user?.admin || false);

    async function onSubmit(data: any) {
        const adminPages = Object.entries(data.adminPages).map(
            ([key, value]) => {
                if (value)
                    return key
                else
                    return false
            }
        ).filter(value => value !== false)
        const adminApi = Object.entries(data.adminApi).map(
            ([key, value]) => {
                if (value)
                    return key
                else
                    return false
            }
        ).filter(value => value !== false)
        delete data.adminPages
        delete data.adminApi
        data.groups = [...adminPages, ...adminApi]
        // alert(JSON.stringify(data))
        // return false
        if (data?.password === '')
            delete data.password
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
        <Admin breadcrumb={{ page1: "Users", page2: "Edit User" }}
            progress={progress}
            login={{ access:props.access, accessPolicy }}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} className={classes.buttons}>
                        <Button type="submit" variant="contained" color="primary">Save User</Button>
                        {/* <Button variant="contained" color="primary">Reset Password</Button> */}
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
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            // rules={{ required: "Password required" }}
                            render={({ field, fieldState: { error } }) => <TextField
                                {...field} label="password" className={classes.textField} type="password"
                                error={!!error}
                                helperText={error ? error.message : null}
                            />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="admin"
                            control={control}
                            defaultValue={props.user.admin || false}
                            // rules={{ required: 'Firstname required' }}
                            render={({ field, fieldState: { error } }) => <FormControlLabel control={<Checkbox
                                {...field}
                                checked={field.value}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />}
                                label="Admin"
                            />
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        admin Pages:<br />
                        {props.accessPolicies.admin.map((key, index) => {
                            return (
                                <>
                                    <Controller
                                        key={index}
                                        name={"adminPages." + key}
                                        control={control}
                                        defaultValue={props.user.groups.find((value: string) => value === key) ? true : false}
                                        render={({ field, fieldState: { error } }) => <FormControlLabel control={<Checkbox
                                            {...field}
                                            checked={field.value}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />}
                                            label={key}
                                        />
                                        }
                                    />
                                    <br />
                                </>
                            )
                        })}
                    </Grid>
                    <Grid item xs={6}>
                        admin API:<br />
                        {props.accessPolicies.api.map((key, index) => {
                            return (
                                <>
                                    <Controller
                                        key={index}
                                        name={"adminApi." + key}
                                        control={control}
                                        defaultValue={props.user.groups.find((value: string) => value === key) ? true : false}
                                        render={({ field, fieldState: { error } }) => <FormControlLabel control={<Checkbox
                                            {...field}
                                            checked={field.value}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />}
                                            label={key}
                                        />
                                        }
                                    />
                                    <br />
                                </>
                            )
                        })}
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
    const access = await ValidateAccessPolicy(context, accessPolicy)
    if (access === false)
        return {
            props: {
                access
            }
        }
    const user = await Users.findById(context.query._id)
    const accessPolicies = await getAccessPolicies()
    return {
        props: {
            user: JSON.parse(JSON.stringify(user)),
            accessPolicies,
            access: true
        }
    }
}