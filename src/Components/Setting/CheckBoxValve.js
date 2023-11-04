import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";
import {useState} from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
export default function IndeterminateCheckbox(props) {
    const [checked, setChecked] = React.useState([true, false,false]);
    const [CValveChecked5, setCValveChecked5] = React.useState(true);
    const [CValveChecked4, setCValveChecked4] = React.useState(true);
    const [CValveChecked3, setCValveChecked3] = React.useState(true);
    const [CValveChecked2, setCValveChecked2] = React.useState(true);
    const [CValveChecked1, setCValveChecked1] = React.useState(true);




    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1],checked[2]]);
    };

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="control valve 1 open"
                // control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                control={<Switch id="cValveOpen1" {...label} defaultChecked onChange={function(e) {
                    setCValveChecked1(e.target.checked)
                }} />}
            />

            <TextField
                id="cvalve1w"
                name="setpoint"
                label="waterneed"
                fullWidth
                autoComplete="25"
                variant="standard"
                disabled={CValveChecked1}
            />
            <FormControlLabel
                label="control valve 2 open"
                control={<Switch id="cValveOpen2" {...label} defaultChecked onChange={function(e) {
                    setCValveChecked2(e.target.checked)
                }} />}
            />

            <TextField
                id="cvalve2w"
                name="setpoint"
                label="waterneed"
                fullWidth
                autoComplete="25"
                variant="standard"
                disabled={CValveChecked2}
            />
            <FormControlLabel
                label="control valve 3 open"
                control={<Switch id="cValveOpen3" {...label} defaultChecked onChange={function(e) {
                    setCValveChecked3(e.target.checked)
                }} />}
            />

            <TextField
                id="cvalve3w"
                name="setpoint"
                label="waterneed"
                fullWidth
                autoComplete="25"
                variant="standard"
                disabled={CValveChecked3}
            />
            <FormControlLabel
                label="control valve 4 open"
                control={<Switch id="cValveOpen4" {...label} defaultChecked onChange={function(e) {
                    setCValveChecked4(e.target.checked)
                }} />}
            />

            < TextField
                id="cvalve4w"
                name="setpoint"
                label="waterneed"
                fullWidth
                autoComplete="25"
                variant="standard"
                disabled={CValveChecked4}
            />
            {/*<div>*/}
            {/*    <Switch {...label} defaultChecked />*/}
            {/*    <Switch {...label} />*/}
            {/*    <Switch {...label} disabled defaultChecked />*/}
            {/*    <Switch {...label} disabled />*/}
            {/*</div>*/}
        </Box>
    );

    return (
        <div>
            <Typography variant="h5">
                Control Valve
            </Typography>
            {children}
        </div>
    );
}