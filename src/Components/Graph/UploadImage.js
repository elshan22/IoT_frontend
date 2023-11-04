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
import ImageUploader from "./ImageUploader";

export default function UploadDialog(props) {


    return (
        <div>
            <Dialog open={props.openDialog} onClose={props.handleCloseDialog}>
                <DialogTitle>Upload tab</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Set Image
                    </DialogContentText>
                    <ImageUploadCard setBackground={props.setBackground}/>

                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={props.handleCloseDialog}>
                        Close
                    </Button>
                    {/*<Button onClick={props.handleCloseDialog} autoFocus>*/}
                    {/*    Save*/}
                    {/*</Button>*/}
                </DialogActions>
            </Dialog>


        </div>
    );

}
