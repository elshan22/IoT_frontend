import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Profile from './Navtabs/profile';
import {
    Breadcrumbs,
    Divider,
    FormControl,
    InputLabel,
    List,
    Select,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon
} from "@mui/material";
import {Component} from "react";
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {mainListItems, secondaryListItems} from "./ListItems";

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useDispatch, useSelector} from "react-redux";

import Chart from '../../../Components/Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import LineChart from "../../../Components/LineChart";
import './Chart.css';
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import SettingsIcon from "@mui/icons-material/Settings";
import SecurityIcon from '@mui/icons-material/Security';

import {connect} from "react-redux";
import {baseUrl, login, tokenConfig} from "../../../Actions/auth";
import MatrixForm from "../../../Components/Matrix/MatrixSetting";
import MakeGraph from "../../../Components/Graph/Graph.js";
// import ProfileSetting from "./Navtabs/ProfileSetting";
import ProfileSetting from '../../../Components/ProfileSetting/ProfSetting.js'
import SecurityReports from '../../../Components/Reports/Testing/testReport'
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import ConfigForm from '../../../Components/Setting/NodeSetting'

import ReportStates from '../../../Components/Reports/Report'

import store from '../../../store'
import FaultTab from "./FaultTab";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import {AUTH_ERROR, RECEIVE_NODETEMP, RECEIVE_ROOMTEMP, USER_LOADED} from "../../../Actions/types";
import {returnErrors} from "../../../Actions/messages";

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import ControlPanelSetting from "../../../Components/ControlPanel/ControlPanelSetting.js";
import {setNodes} from "../../../Actions/recieveData";
import {HOST_URL} from "../../../settings";
import {makeStyles} from "@material-ui/core/styles";


function handleClickBread(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}


const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    backgroundColor: "#7400b8",
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
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
}));
export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            backgroundColor: "#e09f3e",
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
//
const mdTheme = createTheme();
// function DashboardContent() {
//     const [open, setOpen] = React.useState(true);
//     const toggleDrawer = () => {
//         setOpen(!open);
//     };

function DashboardContent(props) {

    let modData = {};
    modData['nodes'] = [{ id: "1"}];
    modData['links'] =
        [
        ]
    ;

    const [open, setOpen] = React.useState(true);
    const [menu, setMenu] = React.useState("Dashboard");

    const [backGroundImage, setBAckGroundImage] = React.useState('');

    let countError = useSelector(() => store.getState().errors.msg).length;
    let Errors = useSelector(() => store.getState().errors);
    let colors = useSelector(() => store.getState().receiveData.colors);
    let dateConfig = useSelector(() => store.getState().receiveData.config);
    let dataPychart = useSelector(() => store.getState().receiveData.pychart);
    const [nodeId,setNodeId] = React.useState('');

    let IdMax = useSelector(() => store.getState().receiveData.idMax);
    if(!IdMax) IdMax = "";
    let IdMin = useSelector(() => store.getState().receiveData.idMin);
    if(!IdMin) IdMin = "";
    let tempMax = useSelector(() => store.getState().receiveData.tempMax);
    if(!tempMax) tempMax = ""
    let tempMin = useSelector(() => store.getState().receiveData.tempMin);
    if(!tempMin) tempMin = ""

    let dataRoomTemp = useSelector(() => store.getState().receiveData.roomTemp);
    let chartData = []
    if(dataRoomTemp && dataRoomTemp.length!==0){
        chartData = dataRoomTemp
    }


    let dataTime = useSelector(() => store.getState().receiveData.time);
    let listNodes = useSelector(() => store.getState().receiveData.listNodes);
    let dataTemp = useSelector(() => store.getState().receiveData.temp);
    let times = [];
    let temps = [];
    if(dataTime && dataTemp && dataTime.length !==0 && dataTemp.length !==0){
        times = dataTime;
        temps = dataTemp;
    }

    if(listNodes && listNodes.length!==0){
        console.log("fadayat shavam...")
    }

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setMenu("Graph");
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let token = localStorage.getItem('token_access')
        if (token) {
            config.headers['Authorization'] = `JWT ${token}`;
        }
        setAge(event.target.value);
        setNodeId(event.target.value)
        axios
            .post(baseUrl+'api/users/sendlastdata/' , {nodeid:event.target.value},config)
            .then((res) => {
                console.log("res")
                console.log(res.data)
                dispatch({
                    type: RECEIVE_NODETEMP,
                    payload: res.data,
                });
            })
            .catch((err) => {
                console.log("error in receive node temp "+err)
            });
    };

    const dispatch = useDispatch();

    const toggleDrawer = () => {
        setOpen(!open);
    };
    let dataMiddle;

    function submitDate(event) {
        console.log('in from to to Node Temp')
        event.preventDefault()
        let from = document.getElementById('fromDateNode').value
        let to = document.getElementById('toDateNode').value

        let url = HOST_URL+"/api/users/ReportNodeStation/";
        let data2 = {
            nodeid:nodeId,
            from:from,
            to:to
        }
        axios.post(url, data2, { // receive two parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.log(res);
            })

    }

    if(menu === "Dashboard"){



        if((Object.keys(dateConfig).length !== 0 )) {
            dateConfig = JSON.parse(dateConfig)
            modData['nodes'] = dateConfig.graph
            console.log("fadayat shavam...")
            console.log(modData['nodes'])
            modData['links'] = dateConfig.links

        }

        if(Errors && Errors.id && Errors.id.length !== 0) {
            // console.log("something")
            let listErrorsID = Errors.id
            let listErrorColor = Errors.status
            // let modData = { ...dataState };
            for (let index = 0; index < listErrorsID.length; ++index) {
                let selectNode = modData.nodes.filter(item => {
                    return item.id === listErrorsID[index];
                });
                // console.log(selectNode)
                selectNode.forEach(item => {
                    item.color = listErrorColor[index];
                });
            }
        }

        if(colors && colors.length !== 0) {
            console.log("all colors")
            console.log(colors)
            for(let i=0;i<colors.length;i++){
                console.log("set node color with id "+i)
                let nodeId = colors[i][0]
                let nodeColor = colors[i][1]

                console.log("with color  "+nodeColor)
                console.log(nodeId)
                console.log(nodeColor)

                let selectNode = modData.nodes.filter(item => {
                    return item.id.toString() === nodeId.toString();
                });
                // console.log(selectNode)
                selectNode.forEach(item => {
                    item.color = nodeColor;
                });
            }


        }


        dataMiddle = <MakeGraph setBAckGroundImage={setBAckGroundImage} backGroundImage={backGroundImage} data={modData}
                                handelClick={handleChange}/>;
    }
    else if(menu === "Integrations"){
        dataMiddle = <MatrixForm />;
    }
    else if(menu === "Reports"){
        dataMiddle = <ReportStates />
    }
    else if(menu === "Control"){
        dataMiddle = <ControlPanelSetting />
    }
    else if(menu === "Graph"){
        if((Object.keys(dateConfig).length !== 0 )) {
            dateConfig = JSON.parse(dateConfig)
            modData['nodes'] = dateConfig.graph
        }


        if((Object.keys(dataPychart).length !== 0 && dataPychart)){
            console.log(dataPychart)
            dataPychart = JSON.parse(dataPychart)
            // dataPychart = dataPychart.message

            console.log("in pychart")
            console.log(dataPychart)
        }

        dataMiddle = <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 450,
                            borderRadius: 10,
                        }}
                    >

                        <Chart data={chartData} />
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                            borderRadius: 10,
                        }}
                    >
                        <Deposits data={dataPychart}/>
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column',borderRadius: 10, }}>

                        <div className='chart' >
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <FormControl style={{width:"100px"}}>
                                    <InputLabel id="demo-simple-select-label">NodeId</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        {modData['nodes'].map((l,i)=>{
                                            return (<MenuItem key={i} value={l.id}>{l.id}</MenuItem>)
                                        })}
                                    {/*{modData['nodes'][0].id}*/}
                                        {/*<ul>{modData['nodes'].map((item, i) => <li key={item + i}>{item}</li>)}</ul>*/}
                                        {/*<MenuItem value={"1"}>0</MenuItem>*/}
                                        {/*<MenuItem value={"2"}>2</MenuItem>*/}
                                        {/*<MenuItem value={"3"}>3</MenuItem>*/}
                                    </Select>
                                </FormControl>
                                <br />
                                <span style={{marginTop:"15px"}}>
                                <label style={{fontWeight:"bold"}}>
                                    From date:
                                </label>
                                <input type="date" id="fromDateNode"/>
                            </span>{"          "}
                                <span style={{marginTop:"15px"}}>
                                <label style={{fontWeight:"bold"}}>
                                    To date:
                                </label>
                                <input type="date" id="toDateNode"/>
                            </span>{"   "}
                                <Button type="submit" onClick={submitDate} >Submit</Button>

                            </div>

                            <LineChart temps={temps} times={times}/>
                        </div>
                        {/*<Orders />*/}
                    </Paper>

                </Grid>
            </Grid>
        </Container>;
    }
    else if(menu === "ProfileSetting"){
        dataMiddle = <ProfileSetting/>;
    }
    else if(menu === "Profile"){
        dataMiddle = <ProfileSetting/>;
    }
    else if(menu === "SecurityReports"){
        dataMiddle = <SecurityReports/>;
    }
    else if(menu === "Setting"){
        dataMiddle =  <ConfigForm
            formName="Sample Form Submit"
            formDescription="This is sample form using Material UI."
        />;
    }
    else{
        dataMiddle = <h1>Error loading data</h1>;
    }

    return (
            <ThemeProvider theme={mdTheme}>

                <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <AppBar position="absolute" open={open}>
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
                                        ...(open && { display: 'none' }),
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ flexGrow: 1 }}
                                >
                                    {menu}
                                </Typography>

                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ flexGrow: 2 }}
                                >
                                    Farm Max Temperature: {tempMax} / Node ID :{IdMax}
                                </Typography>

                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ flexGrow: 2 }}
                                >
                                    Farm Min Temperature: {tempMin} / Node ID :{IdMin}
                                </Typography>
                                {/*<Typography*/}
                                {/*    component="h4"*/}
                                {/*    variant="h6"*/}
                                {/*    color="inherit"*/}
                                {/*    noWrap*/}

                                {/*>*/}
                                    {/*Username: {localStorage.getItem('username')} {'\xa0\xa0\xa0\xa0\xa0\xa0'}*/}
                                {/*</Typography>*/}
                                {/*<Typography*/}
                                {/*    component="h4"*/}
                                {/*    variant="h6"*/}
                                {/*    color="inherit"*/}
                                {/*    noWrap*/}

                                {/*>*/}
                                {/*    Role: {localStorage.getItem('role')}*/}
                                {/*</Typography>*/}

                                <IconButton color="inherit">
                                    <Profile setmenu={setMenu}/>
                                </IconButton>
                                    <FaultTab len={countError} errors={Errors}/>
                            </Toolbar>

                        </AppBar>
                        <Drawer variant="permanent" open={open}>

                            <Toolbar
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    height: "60px",
                                    px: [1],

                                }}
                            >
                                <IconButton onClick={toggleDrawer}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Toolbar>
                            <Divider />
                            <List component="nav">
                                <div className="bg-gray-200 m-3 rounded-lg">
                                <ListItemButton onClick={() => setMenu("Dashboard")}>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard" />
                                </ListItemButton>
                                </div>
                                <div className="bg-gray-200 m-3 rounded-lg">
                                    <ListItemButton onClick={() => setMenu("Graph")}>
                                        <ListItemIcon>
                                            <PeopleIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Graph" />
                                    </ListItemButton>
                                </div>

                                {/*<div className="bg-gray-200 m-3 rounded-lg">*/}
                                {/*<ListItemButton onClick={() => setMenu("Control")}>*/}
                                {/*    <ListItemIcon>*/}
                                {/*        <PauseCircleOutlineIcon />*/}
                                {/*    </ListItemIcon>*/}
                                {/*    <ListItemText primary="Control Panel" />*/}
                                {/*</ListItemButton>*/}
                                {/*</div>*/}


                                <div className="bg-gray-200 m-3 rounded-lg">
                                <ListItemButton  onClick={() => setMenu("Reports")}>
                                    <ListItemIcon>
                                        <BarChartIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Reports"/>
                                </ListItemButton>
                                </div>
                                {/*<div className="bg-gray-200 m-3 rounded-lg">*/}
                                {/*<ListItemButton onClick={() => setMenu("Integrations")}>*/}
                                {/*    <ListItemIcon>*/}
                                {/*        <LayersIcon />*/}
                                {/*    </ListItemIcon>*/}
                                {/*    <ListItemText primary="Admin Setting" />*/}
                                {/*</ListItemButton>*/}
                                {/*</div>*/}
                                {/*<div className="bg-gray-200 m-3 rounded-lg">*/}
                                {/*<ListItemButton onClick={() => setMenu("SecurityReports")}>*/}
                                {/*    <ListItemIcon>*/}
                                {/*        <SecurityIcon />*/}
                                {/*    </ListItemIcon>*/}
                                {/*    <ListItemText primary="Security Reports" />*/}
                                {/*</ListItemButton>*/}
                                {/*</div>*/}
                                <div className="bg-gray-200 m-3 rounded-lg">
                                <ListItemButton onClick={() => setMenu("ProfileSetting")}>
                                    <ListItemIcon>
                                        <SettingsIcon />
                                    </ListItemIcon >
                                    <ListItemText primary="Login Setting" />
                                </ListItemButton>
                                </div>
                            </List>
                        </Drawer>
                        <Box
                            component="main"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light',
                                        // ? theme.palette.grey[100]
                                        // : theme.palette.grey[900],
                                flexGrow: 1,
                                height: '100vh',
                                overflow: 'auto',
                            }}
                        >

                            <Toolbar />
                            <div role="presentation" onClick={handleClickBread}>
                                <Breadcrumbs className="p-4 px-8" aria-label="breadcrumb">
                                    <Link underline="hover" color="inherit" href="/">
                                        admin
                                    </Link>
                                    <Typography color="text.primary">{menu}</Typography>
                                </Breadcrumbs>
                            </div>

                            {dataMiddle}
                            <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }} className="mt-20">
                                <SpeedDial
                                    ariaLabel="SpeedDial basic example"
                                    sx={{  position: 'absolute', bottom: 16, right: 16 }}
                                    icon={<SpeedDialIcon />}
                                >
                                    {actions.map((action) => (
                                        <SpeedDialAction
                                            key={action.name}
                                            icon={action.icon}
                                            tooltipTitle={action.name}
                                        />
                                    ))}
                                </SpeedDial>
                            </Box>
                        </Box>
                    </Box>

            </ThemeProvider>

    );
}

// const mapStateToProps = (state) =>({
//     Errors: state.errors,
// });
// //
// export default connect (mapStateToProps,null)(DashboardContent);
export default DashboardContent;