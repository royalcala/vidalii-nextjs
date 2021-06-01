import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Account from "./Account";
//
//
export default function MenuDesktop() {
    return (
        <>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={5} color="secondary">
                    <MailIcon />
                </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
           <Account/>
        </>
    )
}