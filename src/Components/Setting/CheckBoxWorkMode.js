import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

export default function IndeterminateCheckboxWork(props) {
    const [checked, setChecked] = React.useState([true, false,false]);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        // console.log(event.target.checked)
        props.setDisableCheckBox(!event.target.checked);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked,checked[2]]);
    };
    const handleChange4 = (event) => {
        setChecked([checked[0], checked[1],event.target.checked]);
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="Sleep mode"
                control={<Switch id="workMode1" {...label}  onChange={handleChange4}/>}
            />
            <FormControlLabel
                label="Optimal mode"
                control={<Switch id="workMode2" {...label}  onChange={handleChange3}/>}
            />
            <FormControlLabel
                label="Manual mode"
                control={<Switch id="workMode3" {...label}  onChange={handleChange2}/>}
            />
        </Box>
    );

    return (
        <div>
            <Typography variant="h5">
                Work mode
            </Typography>
            {children}
        </div>
    );
}