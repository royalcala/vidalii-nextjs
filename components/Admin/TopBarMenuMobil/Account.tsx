import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import Cookies from 'js-cookie'
import { AUTH } from '../../../util/getCookies';
export default function Account(props: { closeMenu: any }) {
    const menuId = 'primary-search-account-menu2';
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {        
        props.closeMenu()
        setAnchorEl(null);

    };
    const popMenu = <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
        <MenuItem onClick={() => {
            //remove session
            Cookies.remove(AUTH)
            location.reload();
            // handleMenuClose()
        }}>Logout</MenuItem>
    </Menu>

    return (
        <>
        <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <p>Profile</p>
        </MenuItem>
        {popMenu}
        </>

    )
}