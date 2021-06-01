import React from 'react'
import MailIcon from '@material-ui/icons/Mail';

const Options: {
    [key: string]: {
        Icon: React.FunctionComponent,
        items: {
            Icon: React.FunctionComponent,
            text: string,
            route: string
        }[]
    }
} = {}

Options.Users = {
    Icon: () => <MailIcon />,
    items: [
        {
            Icon: () => <MailIcon />,
            text: "new User",
            route:"/login"
        }
    ]
}
export default Options