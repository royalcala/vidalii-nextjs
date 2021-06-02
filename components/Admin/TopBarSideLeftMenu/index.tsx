import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Options from './options'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250,
          },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        titleSidebar: {
            textAlign: 'center'
        },
        breadcrumbs: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
        },
    }),
);
export default function SideLeftMenu() {
    const classes = useStyles();
    const [drawer, setDrawer] = React.useState(false);
    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setDrawer(open);
    };

    return (
        <>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawer} onClose={toggleDrawer(false)}>
                <h1 className={classes.titleSidebar}>Vidalii ERP</h1>                
                <Items />
            </Drawer>
        </>
    )
}

function Items() {
    const classes = useStyles();
    const [subItems, setSubItems] = React.useState<null | string>(null)
    const router = useRouter()
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                <Link color="inherit" href="#"
                    onClick={() => {
                        setSubItems(null)
                    }
                    }>
                    / Root
                       </Link>
                {subItems && <Link color="inherit" href="#" >
                    <Typography color="textPrimary">{subItems}</Typography>
                </Link>
                }
            </Breadcrumbs>
            <Divider />
            <List className={classes.list}>
                {subItems === null
                    ?
                    Object.entries(Options).map(
                        ([text, { Icon }], index) => (
                            <ListItem button key={index} onClick={() => {
                                setSubItems(text)
                            }}>
                                <ListItemIcon><Icon /></ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    )
                    :
                    (Options[subItems].items).map(
                        ({ Icon, text, route }, index) => (
                            <ListItem button key={index} onClick={() => {
                                router.push(route)
                            }}>
                                <ListItemIcon><Icon /></ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    )

                }
            </List>
        </>
    )
}