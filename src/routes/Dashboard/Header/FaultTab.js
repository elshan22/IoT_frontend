import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import {Alert, AlertTitle, Collapse} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useSelector} from "react-redux";
import store from "../../../store";
import errors from "../../../Reducers/errors";
export default function FaultTab(props) {
    const [open, setOpen] = React.useState(true);
    const [state, setState] = React.useState({
        right: false,
    });

    let error_list = [];
    let colors = []
    let ids = []
    if(props.errors){
        error_list = props.errors.msg;
        colors = props.errors.status;
        ids = props.errors.id
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <br/>
            <br/>
            <br/>
            <List style={{maxHeight: '100%', overflow: 'auto'}} >

                {
                    error_list.map((error,index)=> {
                        if(ids[index]){
                            if(colors[index]==="red"){
                                return (
                                    <Alert severity="error" key={index}>
                                        <AlertTitle>{error}</AlertTitle>
                                        {/*This is an Error in node ID: {ids[index]}*/}
                                        Error in node with detail
                                    </Alert>
                                )
                            }
                            else if(colors[index]==="blue"){
                                return(
                                    <Alert severity="info" key={index}>
                                        <AlertTitle>{error}</AlertTitle>
                                        {/*This is an info in node ID: {ids[index]}*/}
                                        Information
                                    </Alert>
                                )
                            }
                            else{
                                return (
                                    <Alert severity="warning" key={index}>
                                        <AlertTitle>{error}</AlertTitle>
                                        {/*This is a warning in node ID: {ids[index]}*/}
                                        Warning in node with detail
                                    </Alert>
                                )
                            }
                        }


                    })

                }

            </List>

            <Divider />
            <List>
                {['Messages', 'Errors', 'Notifications'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    let anchor = 'right';
    return (
        <div>
            <React.Fragment key={anchor}>
                <IconButton color="inherit" onClick={toggleDrawer(anchor, true)}>
                    <Badge badgeContent={props.len} color="secondary">
                        <NotificationsIcon onClick={toggleDrawer(anchor, true)} />
                    </Badge>
                </IconButton>
                <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                >
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
