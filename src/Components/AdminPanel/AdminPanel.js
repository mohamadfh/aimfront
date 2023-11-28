import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, Route, Switch} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function AdminPanel({children}) {


    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const navigate = useNavigate();


    return (
        // <ThemeProvider theme={defaultTheme}>
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar open={open} position="absolute">
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        داشبورد
                    </Typography>
                    <Link to="/">
                        <IconButton>
                            <ArrowBackIcon/>
                        </IconButton>
                    </Link>

                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </Toolbar>
                <Divider/>
                <List component="nav">
                    <React.Fragment>
                        <ListItemButton onClick={() => navigate('/dashboard/manage')}>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="مدیریت"/>
                        </ListItemButton>

                        <ListItemButton onClick={() => navigate('/dashboard/reports')}>
                            <ListItemIcon>
                                <BarChartIcon/>
                            </ListItemIcon>
                            <ListItemText primary="گزارش ها"/>
                        </ListItemButton>
                    </React.Fragment>
                    <Divider sx={{my: 1}}/>
                    {/*<React.Fragment>*/}
                    {/*    <ListSubheader component="div" inset>*/}
                    {/*        گزارش های موضوعی*/}
                    {/*    </ListSubheader>*/}

                    {/*    <ListItemButton onClick={() => navigate('/dashboard/block')}>*/}
                    {/*        <ListItemIcon>*/}
                    {/*            <AssignmentIcon />*/}
                    {/*        </ListItemIcon>*/}
                    {/*        <ListItemText primary="گزارش به تفکیک بلوک" />*/}
                    {/*    </ListItemButton>*/}
                    {/*</React.Fragment>*/}
                </List>
            </Drawer>
            {/*<Box*/}
            {/*  component="main"*/}
            {/*  sx={{*/}
            {/*    backgroundColor: (theme) =>*/}
            {/*      theme.palette.mode === 'dark'*/}
            {/*        ? theme.palette.grey[100]*/}
            {/*        : theme.palette.grey[900],*/}
            {/*    flexGrow: 1,*/}
            {/*    height: '100vh',*/}
            {/*    overflow: 'auto',*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Toolbar />*/}
            {/*  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>*/}
            {/*    <Grid container spacing={3}>*/}
            {/*      /!* Chart *!/*/}
            {/*        <Grid item xs={12}>*/}
            {/*            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>*/}
            {/*                <Orders/>*/}
            {/*            </Paper>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12}>*/}
            {/*            <Paper*/}
            {/*                sx={{*/}
            {/*                    p: 2,*/}
            {/*                    display: 'flex',*/}
            {/*                    flexDirection: 'column',*/}

            {/*                }}*/}
            {/*            >*/}
            {/*                <Ladder />*/}
            {/*            </Paper>*/}
            {/*        </Grid>*/}
            {/*      <Grid item xs={12}>*/}
            {/*        <Paper*/}
            {/*            sx={{*/}
            {/*              p: 2,*/}
            {/*              display: 'flex',*/}
            {/*              flexDirection: 'column',*/}
            {/*              height: 350,*/}
            {/*            }}*/}
            {/*        >*/}
            {/*          <StatChart />*/}
            {/*        </Paper>*/}
            {/*      </Grid>*/}

            {/*      /!* Recent Deposits *!/*/}
            {/*      /!*<Grid item xs={12} md={4} lg={3}>*!/*/}
            {/*      /!*  <Paper*!/*/}
            {/*      /!*    sx={{*!/*/}
            {/*      /!*      p: 2,*!/*/}
            {/*      /!*      display: 'flex',*!/*/}
            {/*      /!*      flexDirection: 'column',*!/*/}
            {/*      /!*      height: 240,*!/*/}
            {/*      /!*    }}*!/*/}
            {/*      /!*  >*!/*/}
            {/*      /!*    <Deposits />*!/*/}

            {/*      /!*  </Paper>*!/*/}
            {/*      /!*</Grid>*!/*/}
            {/*      /!* Recent Orders *!/*/}

            {/*    </Grid>*/}
            {/*  </Container>*/}
            {/*</Box>*/}
            {children}
        </Box>
        // </ThemeProvider>
    );
}
