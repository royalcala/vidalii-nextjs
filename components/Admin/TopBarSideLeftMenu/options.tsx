import React from 'react'
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
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
    Icon: () => <PeopleIcon />,
    items: [
        {
            Icon: () => <PersonAddIcon />,
            text: "New User",
            route: "/admin/users/new"
        },
        {
            Icon: () => <EditIcon />,
            text: "Edit User",
            route: "/admin/users/edit"
        }

    ]
}
export default Options