import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Admin from "../../../components/Admin";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
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
  }),
);

export default function New() {
  const classes = useStyles();
  const { control, handleSubmit, getValues } = useForm();
  const [progress, setProgress] = React.useState(false)
  const [dialog, setDialog] = React.useState(false)
  const [msgDialog, setMsgDialog] = React.useState("")
  async function onSubmit(data: any) {
    setProgress(true)
    const resp = await fetch('/api/admin/users/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getValues())
    })
    const json = await resp.json();
    setProgress(false)
    if (json.success === true)
      setMsgDialog("User Created")
    else
      setMsgDialog("error:" + json.msg)
    setDialog(true)
  }
  return (
    <Admin breadcrumb={{ page1: "Users", page2: "New User" }} progress={progress} login={true}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">New User</Button>
          </Grid>
          <Grid item>
            <Controller
              name="firstname"
              control={control}
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
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
              rules={{ required: "Password required" }}
              render={({ field, fieldState: { error } }) => <TextField
                {...field} label="password" className={classes.textField} type="password"
                error={!!error}
                helperText={error ? error.message : null}
              />}
            />
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