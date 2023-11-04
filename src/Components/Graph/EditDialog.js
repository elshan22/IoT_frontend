import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuItem from "@mui/material/MenuItem";
import {InputLabel, Select, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ImageUploadCard from "./FileUpload";
import Typography from "@mui/material/Typography";

export default function EditDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [selectNode, setSelectNode] = React.useState('');
    const [selectRoom, setSelectRoom] = React.useState('');

    let modData = props.modData;
    let menus = "Nodes not loaded";
    if(modData) {
        menus = modData['nodes'].map((l,i)=>{
            return (<MenuItem key={i} value={l.id}>{l.id}</MenuItem>)
        })
    }

    function handleChangeNode(event) {
        setSelectNode(event.target.value);
    }
    function handleChangeRoom(event) {
        setSelectRoom(event.target.value);
    }

    return (
        <div>
            <Dialog open={props.openDialog} onClose={props.handleCloseDialog}>
                <DialogTitle>Edit tab</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Set Id of a node and select a room id to load image of a map
                    </DialogContentText>
                    <FormControl style={{marginTop:"20px" ,width:"100%"}}>
                        <InputLabel htmlFor="demo-controlled-open-select">Floor Select</InputLabel>
                        <Select
                            value={selectRoom}
                            onChange={handleChangeRoom}
                            inputProps={{
                                name: 'age',
                                id: 'demo-controlled-open-select',
                            }}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>



                        <Box
                            noValidate
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                m: 'auto',
                            }}
                        >
                            <Grid item xs={4} lg={4}>
                                <FormControl style={{marginTop:"20px" ,width:"100px"}}>
                                    <InputLabel id="demo-simple-select-label">NodeId</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectNode}
                                        onChange={handleChangeNode}
                                    >
                                        {menus}

                                        {/*{modData['nodes'][0].id}*/}
                                        {/*<ul>{modData['nodes'].map((item, i) => <li key={item + i}>{item}</li>)}</ul>*/}
                                        {/*<MenuItem value={"1"}>0</MenuItem>*/}
                                        {/*<MenuItem value={"2"}>2</MenuItem>*/}
                                        {/*<MenuItem value={"3"}>3</MenuItem>*/}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField sx={{ mt: 2 , ml:1}} id="standard-basic" label="Mac Address" variant="standard" />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField sx={{ mt: 2 , ml:1}} id="standard-basic" label="Node ID" variant="standard" />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField sx={{ mt: 2 , ml:1}} id="standard-basic" label="Floor Number" variant="standard" value={selectRoom}/>
                            </Grid>
                            <br />

                        </Box>

                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={props.handleCloseDialog}>
                        Close
                    </Button>
                    <Button onClick={props.handleCloseDialog} autoFocus>
                        Save
                    </Button>
                </DialogActions>
                {/*<ImageUploadCard />*/}
            </Dialog>

            {/*<Dialog*/}
            {/*    fullScreen={fullScreen}*/}
            {/*    maxWidth='lg'*/}
            {/*    open={props.openDialog}*/}
            {/*    onClose={props.handleCloseDialog}*/}
            {/*    aria-labelledby="responsive-dialog-title"*/}
            {/*>*/}
            {/*    <DialogTitle id="responsive-dialog-title">*/}
            {/*        {"Edit nodes and building plane"}*/}
            {/*    </DialogTitle>*/}
            {/*    <DialogContent>*/}
            {/*        <DialogContentText sx={{width:"1000px"}}>*/}
            {/*            Please select Node and set Id and room Id*/}
            {/*        </DialogContentText>*/}

            {/*    </DialogContent>*/}
            {/*    <Box*/}
            {/*        noValidate*/}
            {/*        component="form"*/}
            {/*        sx={{*/}
            {/*            display: 'flex',*/}
            {/*            flexDirection: 'row',*/}
            {/*            m: 'auto',*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <Grid item xs={4} lg={4}>*/}
            {/*            <FormControl sx={{ mt: 2, minWidth: 120 }}>*/}
            {/*                <InputLabel htmlFor="max-width">Select Node</InputLabel>*/}
            {/*                <Select*/}
            {/*                    autoFocus*/}
            {/*                    // value={120}*/}
            {/*                    // onChange={handleMaxWidthChange}*/}
            {/*                    label="maxWidth"*/}
            {/*                    inputProps={{*/}
            {/*                        name: 'max-width',*/}
            {/*                        id: 'max-width',*/}
            {/*                    }}*/}
            {/*                >*/}

            {/*                    /!* {getNodeIds()} *!/*/}
            {/*                    <MenuItem value="xs">1</MenuItem>*/}
            {/*                    <MenuItem value="sm">2</MenuItem>*/}
            {/*                    <MenuItem value="md">3</MenuItem>*/}
            {/*                </Select>*/}

            {/*            </FormControl>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={3}>*/}
            {/*            <TextField sx={{ mt: 2 , ml:1}} id="standard-basic" label="Mac Address" variant="standard" />*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={3}>*/}
            {/*            <TextField sx={{ mt: 2 , ml:1}} id="standard-basic" label="Node ID" variant="standard" />*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={3}>*/}
            {/*            <TextField sx={{ mt: 2 , ml:1}} id="standard-basic" label="Room ID" variant="standard" />*/}
            {/*        </Grid>*/}
            {/*        <br />*/}
            {/*    </Box>*/}
            {/*    <DialogContent>*/}
            {/*        <DialogContentText sx={{width:"1000px"}}>*/}
            {/*            Select Image*/}
            {/*        </DialogContentText>*/}

            {/*    </DialogContent>*/}
            {/*    <Box*/}
            {/*        noValidate*/}
            {/*        component="form"*/}
            {/*        sx={{*/}
            {/*            display: 'flex',*/}
            {/*            flexDirection: 'row',*/}
            {/*            m: 'auto',*/}
            {/*        }}*/}
            {/*    >*/}

            {/*        <ImageUploadCard />*/}
            {/*    </Box>*/}

            {/*    <DialogActions>*/}
            {/*        <Button autoFocus onClick={props.handleCloseDialog}>*/}
            {/*            Close*/}
            {/*        </Button>*/}
            {/*        <Button onClick={props.handleCloseDialog} autoFocus>*/}
            {/*            Save*/}
            {/*        </Button>*/}
            {/*    </DialogActions>*/}
            {/*</Dialog>*/}
        </div>
    );

    // function getNodeIds() {
    //     if(props.modData != undefined && props.modData.length!=0){
    //         return props.modData['nodes'].map((l, i) => {
    //             return (<MenuItem key={i} value={l.id}>{l.id}</MenuItem>);
    //         });
    //     }
    //     else{
    //         return "nothing"
    //     }
    //
    // }
}
