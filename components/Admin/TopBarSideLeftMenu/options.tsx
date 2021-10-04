import React from 'react'
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListIcon from '@material-ui/icons/List';
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
            Icon: () => <ListIcon />,
            text: "List Users",
            route: "/admin/users/list"
        },
        {            
            Icon: () => <PersonAddIcon />,
            text: "New User",
            route: "/admin/users/new"
        },       

    ]
}
export default Options