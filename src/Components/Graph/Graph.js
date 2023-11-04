import { Graph } from "react-d3-graph";
import React, {useEffect, useRef} from 'react';
import {useSelector, connect, useDispatch} from "react-redux";
import store from "../../store";
import SimpleDialog from "./Dialog";
import {blue, green, yellow, red} from "@mui/material/colors";
import actions from "redux-form/lib/actions";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Matrix from "../Matrix/matrix";
import {
    BottomNavigation,
    BottomNavigationAction,
    CardActions,
    CardContent, ListItem,
    ListItemAvatar,
    ListItemText, Menu
} from "@mui/material";
import Button from "@mui/material/Button";

import RestoreIcon from '@mui/icons-material/Restore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from "@mui/material/Grid";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import EditIcon from '@mui/icons-material/Edit';
import AlbumIcon from '@mui/icons-material/Album';
import NodeForm from "../Setting/NodeForm";

import LineChart from "./nodeChart";
import {Label} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {baseUrl} from "../../Actions/auth";
import {RECEIVE_NODETEMP} from "../../Actions/types";
import LineChart2 from "./nodeChart";
import MenuItem from "@mui/material/MenuItem";
import EdithDialog from "./EditDialog";
import UploadDialog from "./UploadImage";
import html2canvas from "html2canvas";
import SaveIcon from '@mui/icons-material/Save';
import exportAsImage from "./ExportAsImage";
import Avatar from "@mui/material/Avatar";
import CircleIcon from '@mui/icons-material/Circle';
import List from "@mui/material/List";
import PositionedMenu from "./RoomSelect";
import handleSubmit from "redux-form/lib/handleSubmit";
import Calculation from "../Setting/Calculation";
import ControPanel from "../Setting/ControlPanel";
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
// the graph configuration, just override the ones you need
const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        shape:'rec',
        color: "green",
        size: 420,
        highlightStrokeColor: "blue",
    },
    link: {
        highlightColor: "lightblue",
    },
};

function MakeGraph(props) {
    let dataShortDetail = useSelector(() => store.getState().receiveData.shortDetail);
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    let hvac1Color = { bgcolor: red[100], color: red[600] }
    let hvac2Color = { bgcolor: red[100], color: red[600] }
    let fanair1Color = { bgcolor: red[100], color: red[600] }
    let fanair2Color = { bgcolor: red[100], color: red[600] }

    let details = {
        "nodeId":"1",
        "time":  dateTime,
        "temp": "29",
        "lastOccupancy":"None",
        "lightSensor":"Null",
        "humiditySensor":"Null",
        "analogSensor1":"Null",
        "analogSensor2":"Null",
        "fanAir1":" ",
        "fanAir2":" ",
        "hvac1":" ",
        "hvac2":" ",
        "parameter":" ",
        "type":" ",
        "setPoint":"None",
        "mode":"None",
        "fanAir1Temp":"-1",
    }
    if(dataShortDetail && !(Object.keys(dataShortDetail).length === 0)){
        console.log("short detail updated")
        console.log(details.type === '1')
        console.log("something fun")
        details = dataShortDetail;
        if(details.hvac1==="on"){
            hvac1Color = { bgcolor: green[100], color: green[600] }
        }
        if(details.hvac2==="on"){
            hvac2Color = { bgcolor: green[100], color: green[600] }
        }
        if(details.fanAir1==="on"){
            fanair1Color = { bgcolor: green[100], color: green[600] }
        }
        if(details.fanAir2==="on"){
            fanair2Color = { bgcolor: green[100], color: green[600] }
        }

    }
    if(dataShortDetail && !(Object.keys(dataShortDetail).length === 0)){
        console.log("short detail updated")
        details = dataShortDetail;
    }
    ///////// dialog state :
    const [openDialog, setOpenDialog] = React.useState(false);

    const [openDialogUpload, setOpenDialogUpload] = React.useState(false);

    useEffect(() => {
        console.log("I have been mounted")
        handleRefresh()
    }, [])

    const handleClickOpenDialog = () => {
        console.log("fun")
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleClickOpenDialogUpload = () => {
        console.log("fun upload")
        setOpenDialogUpload(true);
    };
    const handleCloseDialogUpload = () => {
        setOpenDialogUpload(false);
    };

    const onClickedNodeMenu = function(elem) {
        console.log("in click down menu")
        console.log(elem.target.innerHTML)

        let modData = { ...dataState };

        let selectNode = modData.nodes.filter(item => {
            return item.id === elem.target.innerHTML;
        });
        selectNode.forEach(item => {
            item.color = "#f8c0cb";
            setSelectedNode(item.id);
            getLastData(item.id);

        });
        setData(modData)


    };

    let modData = props.data;
    let menus = "Nodes not loaded";
    let elements = [];
    if(modData) {

        let numberNodes = modData['nodes'].length;
        for(let k=1;k<=numberNodes/6+1;k++){
            elements.push(
                modData['nodes'].map((l,i)=>{
                    if((k-1)*5<=i && i<k*5){
                        let secondary = "";
                        if(modData.nodes[i].color)
                            secondary = modData.nodes[i].color
                        return (
                            // <Grid item xl={3} sm={12}>
                            <div>
                                <Grid item sm={12}  width="100%">
                                    <ListItem key={i} >
                                        <ListItemAvatar>
                                            <CircleIcon  style={{ color: secondary }} />
                                        </ListItemAvatar>
                                        <ListItemText color={blue} primary={l.id} id='elementIdNode'/>
                                        <Button variant="text" onClick={()=>{
                                            console.log("in button")
                                            console.log(l.id+"   "+i)
                                            setSelectedNode(l.id);
                                            getLastData(l.id);
                                            setData(modData)
                                        }}>Graph node {l.id}</Button>
                                    </ListItem>
                                </Grid>
                            </div>
                        )
                    }

                })
            )
        }

        console.log("loghmani");
        console.log(elements)
    }
    let namayesh =elements.map((l,i)=>{
        return(
            <BottomNavigation
                showLabels
            >

                {elements[i]}
            </BottomNavigation>
        )


    })
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    let count_run = 0;
    // make a dialog ready:
    const [open, setOpen] = React.useState(false);
    const [selectedNode, setSelectedNode] = React.useState("");
    const [nodeColor, setColor] = React.useState(green);
    const [dataState, setData] = React.useState(props.data);
    let backImage = useSelector(()=>props.backGroundImage)

    let IMageUrl = `url(https://s6.uupload.ir/files/screenshot_from_2022-09-11_11-24-51_lajk.png)`
    if(backImage){
        IMageUrl = `url(${props.backGroundImage})`
    }
    const handleClickOpen = (node) => {
        setSelectedNode(node);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    let dataTime = useSelector(() => store.getState().receiveData.time);
    let dataTemp = useSelector(() => store.getState().receiveData.temp);
    const [stopGraph,setStopGraph] = React.useState(true)
    let times = [];
    let temps = [];
    if(dataTime && dataTemp && dataTime.length !==0 && dataTemp.length !==0){
        times = dataTime;
        temps = dataTemp;
    }
    if(stopGraph){
        console.log("graph stopped")
        times = [];
        temps = [];
    }
    React.useEffect(() => {
        let nodes = props.data.nodes;
        // eslint-disable-next-line array-callback-return
        nodes.map((node)=>{
            let availableNode = document.getElementById(node.id);
            if (availableNode) {
                availableNode.addEventListener('click',function (){
                    handleClickOpen(node);
                })
            }
        })
    }, [])

    const getLastData = (id) => {
        console.log('get last data')
        console.log(id)
        var data2 = {nodeid:id}
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let token = localStorage.getItem('token_access')
        if (token) {
            config.headers['Authorization'] = `JWT ${token}`;

        }
        // fetch(baseUrl+'api/users/sendlastdata/', {
        //     method: "POST",
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(data2)
        // }).then(res => {
        //             console.log("resieve data in graph")
        //             console.log(res.data)
        //             dispatch({
        //                 type: RECEIVE_NODETEMP,
        //                 payload: res.data,
        //             });
        // });

        axios
            .post(baseUrl+'api/users/sendlastdata/' , {nodeid:id},config)
            .then((res) => {
                console.log("resieve data in graph")
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

    const onClickedNode = function(nodeId) {
        console.log("in click")
        let modData = { ...dataState };

        let selectNode = modData.nodes.filter(item => {
            return item.id === nodeId;
        });
        selectNode.forEach(item => {
            setSelectedNode(item.id);
            getLastData(item.id);

        });
        setData(modData)


    };
    const theme = createTheme();
    const useStyles = makeStyles({border: "solid 1px #555", backgroundColor: "#fbfbf7", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
        MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"});

    function handleRefresh() {
        console.log("refreshed button click")
        axios
            .get(baseUrl + 'api/users/graph/' )
            .then((res) => {
                console.log("get data from server")
            })
            .catch((err) => {
                console.log("error in receive data "+err)
            });
    }
    const canvasRef = useRef()
    function handleSaveButton() {
        exportAsImage(document.querySelector("#graphDiv"), "test").then(r =>console.log("done"))
        // html2canvas(document.querySelector("#graphDiv")).then(canvas => {
        //     document.body.appendChild(canvas)
        // });

    }

    // let graphSelect = document.getElementById('graph-id-graph-wrapper')
    //     if(graphSelect)
    //         graphSelect.style.backgroundImage = `url(${backGroundImage})`
    //
    // console.log("background:")
    // console.log(backGroundImage)
    return (
        <Box sx={{ flexGrow: 1 }}>
             <EdithDialog modData={props.data} handleClickOpenDialog={handleClickOpenDialog} handleCloseDialog={handleCloseDialog} openDialog={openDialog}/>
             <UploadDialog setBackground={props.setBAckGroundImage} modData={props.data} handleClickOpenDialog={handleClickOpenDialogUpload} handleCloseDialog={handleCloseDialogUpload} openDialog={openDialogUpload}/>
            <Grid container spacing={2}>
                <Grid item lg={8} sm={12}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <AppBar
                            position="absolute"
                            color="default"
                            elevation={0}
                            sx={{
                                position: 'relative',
                                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                            }}
                        >
                        </AppBar>
                        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 3, md: 1 } }} style={{border: "solid 1px #555", backgroundColor: "#fbfbf7", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
                                MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"}} >
                                <React.Fragment>
                                    <React.Fragment>
                                        <div>
                                            {/*backgroundImage:`url(${props.backGroundImage})`*/}
                                            <div id='graphDiv' style={{height:'600px',width:'100%',backgroundImage:IMageUrl,backgroundRepeat:"no-repeat",backgroundSize: "contain",backgroundPosition:"center"}}>
                                                {/*<Graph*/}
                                                {/*    id="graph-id" // id is mandatory*/}
                                                {/*    data={props.data}*/}
                                                {/*    config={myConfig}*/}
                                                {/*    onDoubleClickNode={onClickedNode}*/}
                                                {/*    ref={canvasRef}*/}
                                                {/*    // onDoubleClickNode = {onDoubleClickNode}*/}
                                                {/*/>*/}
                                            </div>

                                        </div>
                                        <Box sx={{ width: "100%" }} style={{display: "inline"}}>
                                            <BottomNavigation
                                                showLabels
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                            >
                                                <Grid item sm={4} xs={2}>
                                                    <BottomNavigationAction label="Refresh" icon={<RestoreIcon sx={{ color: green[600] }} />} onClick={handleRefresh} />
                                                </Grid>
                                                <Grid item sm={4} xs={2}>
                                                    <BottomNavigationAction label="Locations" icon={<LocationOnIcon sx={{ color: blue[600] }}/>}  onClick={handleClickOpenDialogUpload}/>
                                                </Grid>
                                                <Grid item sm={4} xs={2}>
                                                    <BottomNavigationAction label="Errors" icon={<ErrorOutlineIcon sx={{ color: red[600] }}/>} />
                                                </Grid>
                                                <Grid item sm={4} xs={2}>
                                                    <BottomNavigationAction label="Warnings" icon={<WarningAmberIcon sx={{ color: 'warning.main' }}/>} />
                                                </Grid>
                                                <Grid item sm={4} xs={2}>
                                                    <BottomNavigationAction label="Edit" icon={<EditIcon sx={{ color: blue[800] }}/>} onClick={handleClickOpenDialog} />
                                                </Grid>
                                                <Grid item sm={4} xs={2} style={{marginTop:"10px"}}>
                                                    <PositionedMenu/>
                                                </Grid>

                                            </BottomNavigation>
                                        </Box>
                                    </React.Fragment>
                                    <React.Fragment>
                                        <div style={{height:(menus.length%7)*100+'px'}}>
                                            {namayesh}
                                        </div>
                                    </React.Fragment>
                                </React.Fragment>
                            </Paper>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 3, md: 1 } }} style={{border: "solid 1px #555", backgroundColor:"rgb(255 255 215)", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
                                MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"}} >
                                <React.Fragment>
                                    <React.Fragment>

                                        <Calculation />
                                    </React.Fragment>
                                </React.Fragment>
                            </Paper>
                        </Container>
                    </ThemeProvider>

                </Grid>
                
                <Grid item lg={4} sm={12}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <AppBar
                            position="absolute"
                            color="default"
                            elevation={0}
                            sx={{
                                position: 'relative',
                                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                            }}
                        >
                        </AppBar>
                        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 3, md: 1 } }} style={{border: "solid 1px #555", backgroundColor: "#f3eec3", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
                                MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"}}>
                                <React.Fragment>
                                    <React.Fragment>
                                        <SimpleDialog
                                            open={true}
                                            details = {details}
                                            hvac1Color={hvac1Color}
                                            hvac2Color={hvac2Color}
                                            fanair1Color={fanair1Color}
                                            fanair2Color={fanair2Color}
                                            onClose={handleClose}
                                            selectedNode={selectedNode}
                                            nodeColor={nodeColor}
                                            handleClick = {props.handelClick}
                                        />
                                    </React.Fragment>
                                </React.Fragment>
                            </Paper>
                            <Container component="main" maxWidth="lg" sx={{ mb: 4 }} >
                                <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 3, md: 1 } }} style={{border: "solid 1px #555",  backgroundColor: "rgb(255 255 215)", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
                                    MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"}}>
                                    <div className="p-6">
                                        <NodeForm selectedNode={selectedNode}/>
                                    </div>
                                </Paper>
                            </Container>
                            <Container component="main" maxWidth="lg" sx={{ mb: 4 }} >
                                <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 3, md: 1 } }} style={{border: "solid 1px #555",  backgroundColor: "rgb(255 255 215)", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
                                    MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"}}>
                                    <div className="p-6">
                                        <ControPanel selectedNode={selectedNode} details = {details}/>
                                    </div>
                                </Paper>
                            </Container>
                        </Container>
                    </ThemeProvider>
                </Grid>

                <Grid item lg={12} sm={12}>
                <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <AppBar
                            position="absolute"
                            color="default"
                            elevation={0}
                            sx={{
                                position: 'relative',
                                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                            }}
                        >
                        </AppBar>
                        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 3, md: 1 } }} style={{border: "solid 1px #555", backgroundColor: "#caf0f8", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
                                MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"}}>
                                <React.Fragment>
                                    <LineChart2 times={times} temps={temps} setStopGraph={setStopGraph}/>
                                </React.Fragment>
                            </Paper>
                        </Container>

                    </ThemeProvider>
                </Grid>

                <Grid item xs={4} lg={4} sm={12}>
                    <ThemeProvider theme={theme} >
                        <CssBaseline />
                        <AppBar
                            position="absolute"
                            color="default"
                            elevation={0}
                            sx={{
                                position: 'relative',
                                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                            }}
                        >
                        </AppBar>

                    </ThemeProvider>
                </Grid>
            </Grid>
        </Box>


    );
}

function mapStateToProps(state) {
    return { Errors:state.errors };
}

export default connect(mapStateToProps)(MakeGraph);

// export default MakeGraph;
