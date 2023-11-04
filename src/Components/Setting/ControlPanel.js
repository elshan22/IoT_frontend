import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {FormControl, InputLabel, Select, Slider} from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import axios from "axios";
import {baseUrl} from "../../Actions/auth";
import {AUTH_ERROR, RECEIVE_ROOMTEMP} from "../../Actions/types";
import {returnErrors} from "../../Actions/messages";
import {useDispatch, useSelector} from "react-redux";
import IndeterminateCheckbox from "./CheckBoxValve";
import IndeterminateCheckboxWork from "./CheckBoxWorkMode";

export default function ControPanel(props) {
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [btnDisableCheckBox, setDisableCheckBox] = useState(true)
    const [perm, setPerm] = React.useState('');
    const [room, setRoom] = React.useState('Fancoil Select');
    const selectedNode = props.selectedNode;

    function valuetext(value) {
        return `${value}°C`;
    }
    const marks = [
        {
            value: 20,
            label: '20°C',
        },
        {
            value: 30,
            label: '30°C',
        },
    ];
    let value=20;
    const dispatch = useDispatch();
    function handleSubmit(e) {
        console.log("temp for fun")
        e.preventDefault();
        var baseData ={
            "cValve1": true,
            "cValve2": true,
            "classicMode": false,
            "dongleValue1": "20",
            "dongleValue2": "20",
            "energysavingMode": false,
            "fanAir1": true,
            "fanAir2": true,
            "manualMode": true,
            "nodeid": props.details.nodeId,
            "perm": true,
            "sleepMode": false,
            "temp": 20
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let token = localStorage.getItem('token_access')
        if (token) {
            config.headers['Authorization'] = `JWT ${token}`;
        }

        let cValveOpen1 = document.getElementById("cValveOpen1").checked // false true
        let cValveOpen2 = document.getElementById("cValveOpen2").checked // false true
        let cValveOpen3 = document.getElementById("cValveOpen3").checked // false true
        let cValveOpen4 = document.getElementById("cValveOpen4").checked // false true
        let x1 = parseInt(document.getElementById("cValveFactor1").value)
        let y1 = parseInt(document.getElementById("cvalve1w").value)
        let x2 = parseInt(document.getElementById("cValveFactor2").value)
        let y2 = parseInt(document.getElementById("cvalve2w").value)
        let x3 = parseInt(document.getElementById("cValveFactor3").value)
        let y3 = parseInt(document.getElementById("cvalve3w").value)
        let x4 = parseInt(document.getElementById("cValveFactor4").value)
        let y4 = parseInt(document.getElementById("cvalve4w").value)

        if(!y1) y1 = 1;
        if(!y2) y2 = 1;
        if(!y3) y3 = 1;
        if(!y4) y4 = 1;

        baseData.cValve1 = cValveOpen1;
        baseData.cValve2 = cValveOpen2;
        baseData.fanAir1 = cValveOpen3;
        baseData.fanAir2 = cValveOpen4;
        axios
            .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
            .then((res) => {
                console.log("data sent")
            })

        // if(cValveOpen1 && cValveOpen2 && cValveOpen3 && cValveOpen4){
        //     console.log("all open")
        //     baseData.cValve1 = true;
        //     baseData.cValve2 = true;
        //     baseData.fanAir1 = true;
        //     baseData.fanAir2 = true;
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         .then((res) => {
        //             console.log("data sent")
        //         })
        // }
        // else if(!cValveOpen1 && cValveOpen2 && cValveOpen3 && cValveOpen4)      {
        //     console.log("first close")
        //     baseData.cValve1 = true;
        //     baseData.cValve2 = true;
        //     baseData.fanAir1 = true;
        //     baseData.fanAir2 = true;
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         .then((res) => {
        //             console.log("data sent")
        //         })
        //
        //     if(x1 && x1 !==0){
        //
        //         setTimeout(() => {
        //             baseData.cValve1 = false;
        //             axios.post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         }, y1/x1*1000);
        //     }else{
        //         alert("x1 is zeo")
        //     }
        // }
        // else if(cValveOpen1 && !cValveOpen2 && cValveOpen3 && cValveOpen4){
        //     console.log("second close")
        //     baseData.cValve1 = true;
        //     baseData.cValve2 = true;
        //     baseData.fanAir1 = true;
        //     baseData.fanAir2 = true;
        //
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         .then((res) => {
        //             console.log("data sent")
        //         })
        //
        //     if(x2 && x2 !==0){
        //
        //         setTimeout(() => {
        //             baseData.cValve2 = false;
        //             axios.post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         }, y2/x2*1000);
        //     }else{
        //         alert("x2 is zeo")
        //     }
        // }
        // else if(cValveOpen1 && cValveOpen2 && !cValveOpen3 && cValveOpen4){
        //     console.log("third close")
        //     baseData.cValve1 = true;
        //     baseData.cValve2 = true;
        //     baseData.fanAir1 = true;
        //     baseData.fanAir2 = true;
        //
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         .then((res) => {
        //             console.log("data sent")
        //         })
        //
        //     if(x3 && x3 !==0){
        //
        //         setTimeout(() => {
        //             baseData.fanAir1 = false;
        //             axios.post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         }, y3/x3*1000);
        //     }else{
        //         alert("x3 is zeo")
        //     }
        // }
        // else if(cValveOpen1 && cValveOpen2 && cValveOpen3 && !cValveOpen4){
        //     console.log("fourth close")
        //     baseData.cValve1 = true;
        //     baseData.cValve2 = true;
        //     baseData.fanAir1 = true;
        //     baseData.fanAir2 = true;
        //
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         .then((res) => {
        //             console.log("data sent")
        //         })
        //
        //     if(x4 && x4 !==0){
        //
        //         setTimeout(() => {
        //             baseData.fanAir2 = false;
        //             axios.post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         }, y4/x4*1000);
        //     }else{
        //         alert("x4 is zeo")
        //     }
        // }
        // else{
        //   alert("off more than two control valve not allowed")
        // }
        //

        // if(cValveOpen2){
        //     baseData.cValve2 = true;
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         .then((res) => {
        //             console.log("data sent 2" )
        //         })
        // }else{
        //     baseData.cValve2 = false;
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         .then((res) => {
        //             console.log("data sent")
        //         })
        //     let x = parseInt(document.getElementById("cValveFactor2").value)
        //     let y = parseInt(document.getElementById("cvalve2w").value)
        //     setTimeout(() => {
        //         baseData.cValve2 = true;
        //         axios.post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //     }, y/x);
        //     axios.post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        // }
        //

        // if(cValveOpen3){
        //     baseData.fanAir1 = true;
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         .then((res) => {
        //             console.log("data sent 3")
        //         })
        // }else{
        //     baseData.fanAir1 = false;
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         .then((res) => {
        //             console.log("data sent")
        //         })
        //     let x = parseInt(document.getElementById("cValveFactor3").value)
        //     let y = parseInt(document.getElementById("cvalve3w").value)
        //     setTimeout(() => {
        //         baseData.fanAir1 = true;
        //         axios.post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //     }, y/x);
        //     axios.post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        // }
        //

        // if(cValveOpen4){
        //     baseData.fanAir2 = true;
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         .then((res) => {
        //             console.log("data sent 4")
        //         })
        // }else{
        //     baseData.fanAir2 = false;
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //         .then((res) => {
        //             console.log("data sent")
        //         })
        //     let x = parseInt(document.getElementById("cValveFactor4").value)
        //     let y = parseInt(document.getElementById("cvalve4w").value)
        //     setTimeout(() => {
        //         baseData.fanAir2 = true;
        //         axios.post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        //     }, y/x);
        //     axios.post(baseUrl+'api/users/setnodeconfig/' , baseData,config)
        // }

        // let cValveOpen5 = document.getElementById("cValveOpen5").checked // false true
        // if(cValveOpen5){
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":5,"status":"open"},config)
        //         .then((res) => {
        //             console.log("data sent 5")
        //         })
        // }else{
        //     axios
        //         .post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":5,"status":"close"},config)
        //         .then((res) => {
        //             console.log("data sent")
        //         })
        //     let x = parseInt(document.getElementById("cValveFactor5").value)
        //     let y = parseInt(document.getElementById("cvalve5w").value)
        //     setTimeout(() => {
        //         axios.post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":5,"status":"open"},config)
        //     }, y/x);
        //     axios.post(baseUrl+'api/users/setnodeconfig/' , {"cvavleid":5,"status":"close"},config)
        // }


    }

    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom>
                Control Panel
            </Typography>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <IndeterminateCheckbox disableCheckBox={btnDisableCheckBox}/>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}