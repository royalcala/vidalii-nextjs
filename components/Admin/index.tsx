import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import DesktopMenu from "./TopBarMenuDesktop";
import MobilMenu from './TopBarMenuMobil'
import SideLeftMenu from './TopBarSideLeftMenu'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import Login from "./login";
import Cookies from 'js-cookie'
import { AUTH } from '../../util/getCookies';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        breadcrumb: {
            margin: theme.spacing(2)
        }
    }),
);

export default function Admin(props: {
    login?: boolean,
    breadcrumb: {
        page1: string,
        page2: string
    },
    progress?: boolean,
    // dialog: null | JSX.Element,
    children: any
}) {
    const classes = useStyles();
    if (props?.login === true && Cookies.get(AUTH) === undefined)
        return <Login  />
    else
        return (
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <SideLeftMenu />
                        <Typography className={classes.title} variant="h6" noWrap>
                            Vidalii-ERP
          </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <DesktopMenu />
                        </div>
                        <div className={classes.sectionMobile}>
                            <MobilMenu />
                        </div>
                    </Toolbar>
                </AppBar>

                <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
                    <Link color="inherit" href="#">
                        Root
            </Link>
                    <Link color="inherit" href="#">
                        {props.breadcrumb.page1}
                    </Link>
                    <Typography color="textPrimary">{props.breadcrumb.page2}</Typography>
                </Breadcrumbs>
                {props?.progress && <LinearProgress />}
                <div className={classes.breadcrumb}>

                    {props.children}
                </div>

            </div>
        );
}