import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { AUTH } from '../../../util/getCookies';
export default function MenuAccount() {
    // const router = useRouter()
    const menuId = 'primary-search-account-menu';
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
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
        {/* <MenuItem onClick={() => {
        router.push('/admin/users/edit', { query: "hola=1", })
    }}>Profile</MenuItem> */}
        <MenuItem onClick={() => {
            //remove session
            Cookies.remove(AUTH)
            location.reload();
        }}>Logout</MenuItem>
    </Menu>
    return (
        <>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            {popMenu}
        </>
    )
}