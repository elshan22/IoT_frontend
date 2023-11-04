import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {InputLabel, Select, Slider} from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Switch from "@mui/material/Switch";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";
import {baseUrl} from "../../Actions/auth";




export default function ControlPanelForm() {

  const [disabled, setBtnDisabled] = React.useState(false);
  const [heatingCooling,setHeatingCooling] = React.useState('');
  const [fanOnOff,setFanOffOn] = React.useState('');
  const [menuItemSelect, setBtnMenuItemSelect] = React.useState("");
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const clickSubmit = function() {
    console.log("in click")
    let Mode = menuItemSelect
    let setPoint = document.getElementById("setPoint").value
    let coolingHeatingMode = heatingCooling;
    let FanState = fanOnOff
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let token = localStorage.getItem('token_access')
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`;
    }
    let data = {hvacmode:coolingHeatingMode,
      selectmode:Mode,
      fan:FanState,
      setpoint:setPoint
    }

    console.log("sent data: ")
    console.log(data)

    axios
        .post(baseUrl+'api/users/controlPanel/' , data,config)
        .then((res) => {
          console.log("data sent")
        })



};

  function handleSubmit(e) {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let token = localStorage.getItem('token_access')
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`;
    }
    let data ={
      "longitude":document.getElementById("longitude").value,
      "latitude":document.getElementById("latitude").value
    }

    console.log("sent data weather: ")
    console.log(data)

    axios
        .post(baseUrl+'api/users/weather/' , data,config)
        .then((res) => {
          console.log("data sent weather")
        })


  }

  function coolingHeatingButton(event) {
    if(event.target.value === 'Cooling'){
      setHeatingCooling('cooling')
    }else if(event.target.value === 'Heating'){
      setHeatingCooling('heating')
    }
  }

  function handleFanOn(event) {
    if(event.target.value === 'On'){
      setFanOffOn('on')
    }else if(event.target.value === 'Off'){
      setFanOffOn('off')
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom>
      Control Panel
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5">
            HVAC Mode
          </Typography>
        </Grid>

        <Grid item xs={12} sm={9}>

          <FormControl> 
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="Cooling" control={<Radio onClick={coolingHeatingButton}/>} label="Cooling" />
              <FormControlLabel value="Heating" control={<Radio onClick={coolingHeatingButton} />} label="Heating" />
            </RadioGroup>
          </FormControl>

        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5">
            Select Mode
          </Typography>
        </Grid>

        <Grid item xs={12} sm={9}>

              <Select
                  labelId="demo-simple-select-label"
                  id="sleepModeId"
                  value={menuItemSelect}
                  label="Sleep Mode"
                  onChange={(event) => {
                    console.log("FADAYAT SHAVAM")
                      setBtnMenuItemSelect(event.target.value)
                      if (event.target.value === "sleep") {
                          setBtnDisabled(true);
                      } else {
                          setBtnDisabled(false);
                      }
                  }}
                  style={{width:"150px"}}
                  // onChange={handleChange}
              >
                  <MenuItem value={"sleep"}>Sleep mode</MenuItem>
                  <MenuItem value={"automate"}>Automate</MenuItem>
                  <MenuItem value={"classic"}>Classic mode</MenuItem>

              </Select>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="h5" >
            Set Point
          </Typography>
        </Grid>


        <Grid item xs={12} sm={9}>
          
          <TextField
              id="setPoint"
              name="setpoint"
              label="Set Point"
              fullWidth
              autoComplete="25"
              variant="standard"
              disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={clickSubmit}>Submit</Button>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Weather
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5" >
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
          <Typography variant="h5" >
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
          <Button variant="contained" onClick={handleSubmit} >Refresh Weather</Button>
        </Grid>
      </Grid>
      
    </React.Fragment>
    
  );
}
