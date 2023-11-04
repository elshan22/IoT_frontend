import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {TextField} from "@mui/material";


export default function DangleSetpoint(props) {
    const [checked, setChecked] = React.useState([true, false,false]);



    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1],checked[2]]);
    };

    const label = { inputProps: { 'aria-label': 'Switch demo' } };



    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>

            <FormControlLabel
                label="Dongle Set point 1"
                // control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                control={        <TextField
                    id="dongle1"
                    defaultValue="20"
                    size="small"
                    variant="standard"
                />}
            />
            <FormControlLabel
                disabled={true}
                label="Dongle Set point 2"
                // control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                control={        <TextField
                    id="dongle2"
                    defaultValue="20"
                    size="small"
                    variant="standard"
                />}
            />
        </Box>
    );

    return (
        <div>
            <Typography variant="h5">
                Dongle Set point
            </Typography>
            {children}
        </div>
    );
}
