import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from "@mui/material/IconButton";
import {Badge, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from "@mui/material/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {connect} from "react-redux";
import {logout} from "../../../../Actions/auth";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {deepPurple} from "@mui/material/colors";

const Profile = function BasicMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {/*<Tooltip title="Account settings">*/}
                {/*    <IconButton*/}
                {/*        onClick={handleClick}*/}
                {/*        size="small"*/}
                {/*        sx={{ ml: 2 }}*/}
                {/*        aria-controls={open ? 'account-menu' : undefined}*/}
                {/*        aria-haspopup="true"*/}
                {/*        aria-expanded={open ? 'true' : undefined}*/}
                {/*    >*/}
                        <Avatar sx={{ bgcolor: deepPurple[500] }}  onClick={handleClick}>OP</Avatar>
                    {/*</IconButton>*/}
                {/*</Tooltip>*/}
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar /> {localStorage.getItem('username')}
                </MenuItem>
                <MenuItem>
                    {/*{localStorage.getItem('role')}*/}
                    <Avatar /> Admin
                </MenuItem>
                <Divider />
                <MenuItem onClick={()=>{props.setmenu('Profile')}}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={props.logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Profile);