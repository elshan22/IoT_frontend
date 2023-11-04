import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {ButtonGroup, FormControl, Input, InputLabel, ListItem, Select, Slider} from "@mui/material";
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

import List from "@mui/material/List";

export default function Calculation(props) {

    const [btnDisableCheckBox, setDisableCheckBox] = useState(true)
    const [perm, setPerm] = React.useState('');
    const selectedNode = props.selectedNode;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let value=20;
    function handleSubmit() {
        console.log("calculate waterneed")
        let s = parseFloat(document.getElementById("surfaceArea").value);
        let p = parseFloat(document.getElementById("dailyPart").value);
        let T_min = parseFloat(document.getElementById("minimumDaily").value);
        let T_max = parseFloat(document.getElementById("maxDaily").value);
        let h = parseFloat(document.getElementById("heightSea").value);
        let u_max = parseFloat(document.getElementById("maximumWind").value);
        let u_min = parseFloat(document.getElementById("minimumWind").value);
        let R_n = parseFloat(document.getElementById("R_n").value);
        let k_c = parseFloat(document.getElementById("cropCoeif").value);
        console.log("s:"+s)
        console.log("p:"+p)
        console.log('T_min:'+T_min)
        console.log('T_max:'+T_max)
        console.log('h:'+h)

        // let tim = parseInt(s)  / parseInt(R_n)  *1000;
        // console.log(tim)
        // var timesRun = 0;
        // var interval = setInterval(function(){
        //     timesRun += 1000;
        //     if(timesRun === parseInt(R_n)*1000){
        //         clearInterval(interval);
        //     }
        //     console.log("a message to server "+timesRun)
        // }, tim);

        console.log(s+p+T_min+T_max+h+u_min+u_max+R_n+k_c)
        let temp1; //Dry Tem
        let temp2; //Wet T
        let T;
        let u_2;
        let deltea;
        T=T_max-T_min;
        let y;
        let et0;
        let e0min;
        let e0max;
        let e_a;
        let e_s;
        let waterneed;

        T=(T_max-T_min)/2;
        console.log("t is :" + T)
        y=0.655*0.001*101352*Math.pow(1-2.25577*0.00001*h,5.25588);
        console.log("gamma is :" + y)
        u_2=(u_max-u_min)/2;
        console.log("u_2 is :" + u_2)
        deltea=4098*[(0.6108*Math.pow(Math.E,((17.27*T)/(T+273.3))))/Math.pow((T+273.3),2)]
        console.log("delta is :" + deltea)
        e0min=0.6108*Math.pow(Math.E,(17.27*T_min)/(T_min+273.3));
        console.log("e0min is :" + e0min)
        e0max=0.6108*Math.pow(Math.E,(17.27*T_max)/(T_max+273.3));
        console.log("e0max is :" + e0max)
        e_a=(96*e0max+96*e0min)/2;
        console.log("ea is :" + e_a)
        e_s=(96*e0max+e0min)/2;
        console.log("es is :" + e_s)
        et0=(0.408*deltea*(R_n)+y*(900/(T+273)*u_2*(e_s-e_a)))/(deltea+y*(1+0.34*u_2));
        console.log("et0 is :" + et0)
        waterneed=et0*s*k_c-s*p;
        alert(waterneed)

    }

    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom>
                Calculation
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Longitude
                    </Typography>
                </Grid>


                <Grid item xs={12} sm={9}>

                    <TextField
                        id="longitude"
                        name="setpoint"
                        label="Longitude"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Latitude
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={9}>

                    <TextField
                        id="latitude"
                        name="setpoint"
                        label="Latitude"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" onClick={()=>{
                        var databuilt = {'longitude':document.getElementById('longitude').value,'latitude':document.getElementById('latitude').value}
                        axios
                            .post(baseUrl+'api/users/weather/' , databuilt,config)

                            .then((res) => {
                                console.log("data sent")
                                let y = JSON.parse(res.data)
                                console.log("outerTemp : "+y['conf']['out_temp'])
                                alert("outerTemp : "+y['conf']['out_temp'] +"\n"+"engineTemp : "+y['conf']['engine_temp'])
                            })

                    }}>Get Data</Button>
                </Grid>


                <Grid item xs={12} sm={12}>
                    <Typography variant="h4">
                        Calculate
                    </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                    <List>
                        <ListItem>
                            <TextField label="Daily participation" style={{width: "100%"}} id='dailyPart'/>
                        </ListItem>
                        <ListItem>
                            <TextField label="Min daily Temp" style={{width: "100%"}} id='minimumDaily'/>
                        </ListItem>
                        <ListItem>
                            <TextField label="Max daily Temp" style={{width: "100%"}} id='maxDaily'/>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={6} sm={6}>
                    <List>
                        <ListItem>
                            <TextField label="Min wind speed" style={{width: "100%"}} id='minimumWind'/>
                        </ListItem>
                        <ListItem>
                            <TextField label="Max wind speed" style={{width: "100%"}} id='maximumWind'/>
                        </ListItem>
                    </List>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{marginLeft:"15px"}}>
                        <Button>Edit</Button>
                        <Button>Refresh</Button>
                    </ButtonGroup>
                </Grid>
                <br/>

                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Surface area
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={9}>

                    <TextField
                        id="surfaceArea"
                        name="surfaceArea"
                        label="Surface area"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>


                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Crop coefficient
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={9}>

                    <TextField
                        id="cropCoeif"
                        name="setpoint"
                        label="Crop coefficient"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        Height from sea level
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={9}>

                    <TextField
                        id="heightSea"
                        name="setpoint"
                        label="Height from sea level"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Typography variant="h5">
                        R_n
                    </Typography>
                </Grid>


                <Grid item xs={12} sm={9}>

                    <TextField
                        id="R_n"
                        name="R_n"
                        label="R_n"
                        fullWidth
                        autoComplete="25"
                        variant="standard"
                    />
                </Grid>


                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleSubmit}>Water need</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}