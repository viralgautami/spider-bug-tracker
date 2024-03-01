import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BugReportIcon from '@material-ui/icons/BugReport';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Footer from './Footer';
import { logOut } from '../Redux/Helpers/authHelper';
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import logo from "../Assets/Images/logo2.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor : "white",
        height : '100vh'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor : "#54a6d6",
        // fontFamily: "Montserrat"
        // color: "#FFF",
        
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        backgroundColor: "#f0f4f7",
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    navbarIcons: {
        marginLeft: 'auto',
    },
    footer : {
        position : 'fixed',
        left : 0,
        bottom : 0,
        width : "100%",
        backgroundColor : "#42adff",
        height : "150px"
    },
    text : {
        color : "black",
        textDecoration: "none",
        padding: "0.5rem",
        borderRadius: "8px",
        "&:hover": {
            color : "#1c688a",
            backgroundColor: "#50a3d4",
            textDecoration: "none",
            // border: "1px solid #1c688a",
        }
    },
    navbarStyle: {
        // maxheight: "10px",
        // marginLeft: "5em",
        maxWidth: "85%",
        marginLeft: "8%",
        color: "#292f33",

    }
}));

const Navbar = ({ children }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const nevigate = useNavigate();
    const user = useSelector((state) => state.authReducer);

    useEffect(() => {
        console.log(user);
        if (user.jwtToken === "") {
            nevigate("/signin", {replace : true});
        }
    }, [])

    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };

    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };

    const handleLogOut = () => {
        logOut();
        nevigate('/signin', {replace : true});
    }

    return (
        <>
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                
            >
                <div className={classes.navbarStyle}>
                <Toolbar>
                    {/* <IconButton
                        aria-label="open drawer"
                        // onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Link to="/" >
                        <div >
                            <img src={logo} height="35px" ></img>
                            {/* <Typography variant="h6" noWrap >
                                Spider Bug Tracker
                            </Typography> */}
                        </div>
                    </Link>
                    <div className={classes.navbarIcons}>
                        <Link to="/profile" >
                            <IconButton>
                                <AccountCircleIcon style={{color: "#292f33"}}/>
                            </IconButton>
                        </Link>
                        <IconButton>
                            <PowerSettingsNewIcon style={{color: "#292f33"}} onClick={handleLogOut}/>
                        </IconButton>
                    </div>
                </Toolbar>
                </div>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton 
                        disabled
                    // onClick={handleDrawerClose}
                    >
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key="Projects">
                        <ListItemIcon><AssignmentIcon /></ListItemIcon>
                        <ListItemText primary="Projects" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key="Bugs">
                        <ListItemIcon><BugReportIcon /></ListItemIcon>
                        <ListItemText primary="Bugs" />
                    </ListItem>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {
                    children
                }
            </main>
        </div>
        {/* <div className={classes.footer}>
            <Footer />
        </div> */}
        </>
    );
}

export default Navbar