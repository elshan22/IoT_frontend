// imports the React Javascript Library
import React from "react";
//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";

import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import blue from "@material-ui/core/colors/blue";

import Icon from "@material-ui/core/Icon";
import PageviewIcon from "@material-ui/icons/Pageview";
import SearchIcon from "@material-ui/icons/Search";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CollectionsIcon from "@material-ui/icons/Collections";

import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";

// Search
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ReplayIcon from "@material-ui/icons/Replay";

//Tabs
import { withStyles } from "@material-ui/core/styles";
import {ImageListItem} from "@mui/material";
import ImageUploader from "./ImageUploader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";

export let imageGallery = [
    "http://37.156.25.234:8000/media/users/None/20220902224931909.png",
    "images.jpeg",
    "1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "caturday-shutterstock_149320799.jpg"
];

const styles = theme => ({
    root: {
        // backgroundColor: theme.palette.background.paper,
        width: "100%",
        // display: "flex",
        justifyContent: "center",
        // alignItems: "flex-end"
    },
    icon: {
        margin: theme.spacing(2)
    },
    iconHover: {
        // margin: theme.spacing.unit * 2,
        "&:hover": {
            color: red[800]
        }
    },
    cardHeader: {
        textalign: "center",
        align: "center",
        // backgroundColor: "white"
    },
    input: {
        display: "none"
    },
    title: {
        color: blue[800],
        fontWeight: "bold",
        fontFamily: "Montserrat",
        align: "center"
    },
    button: {
        color: blue[900],
        margin: 10
    },
    secondaryButton: {
        color: "gray",
        margin: 10
    },
    typography: {
        margin: theme.spacing(2),
        backgroundColor: "default"
    },

    //
    searchRoot: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%"
    },
    searchInput: {
        marginLeft: 8,
        flex: 1
    },
    searchIconButton: {
        padding: 10
    },
    searchDivider: {
        margin: 4
    }
});

class ImageUploadCard extends React.Component {

    state = {
        mainState: "initial", // initial, search, gallery, uploaded
        imageUploaded: 0,
        selectedFile: null,
    };

    handleUploadClick = event => {
        console.log();
        const file = event.target.files[0];
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);

        reader.onloadend = function(e) {
            this.setState({
                selectedFile: [reader.result]
            });
        }.bind(this);
        console.log(url); // Would see a path?

        this.setState({
            mainState: "uploaded",
            selectedFile: event.target.files[0],
            imageUploaded: 1
        });
    };

    handleSearchClick = event => {
        this.setState({
            mainState: "search"
        });
    };

    handleGalleryClick = event => {
        this.setState({
            mainState: "gallery"
        });
    };

    renderInitialState() {
        const { classes, theme } = this.props;
        const { value } = this.state;
        return (
                    <Grid container alignItems="center" style={{justifyContent:"center"}}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={this.handleUploadClick}
                        />
                        <label htmlFor="contained-button-file">
                            <ListItemButton>
                                <ListItemIcon  className={classes.button}>
                                    <AddPhotoAlternateIcon />
                                </ListItemIcon>
                            </ListItemButton>
                        </label>
                        <ListItemButton onClick={this.handleSearchClick}>
                            <ListItemIcon  className={classes.button}>
                                <SearchIcon />
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={this.handleGalleryClick}>
                            <ListItemIcon  className={classes.button}>
                                <CollectionsIcon />
                            </ListItemIcon>
                        </ListItemButton>
                        {/*<div className={classes.button} onClick={this.handleSearchClick}>*/}
                        {/*    <SearchIcon />*/}
                        {/*</div>*/}
                        {/*<div className={classes.button} onClick={this.handleGalleryClick}>*/}
                        {/*    <CollectionsIcon />*/}
                        {/*</div>*/}
                    </Grid>


        );
    }

    handleSearchURL = event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);

        reader.onloadend = function(e) {
            this.setState({
                selectedFile: [reader.result]
            });
        }.bind(this);
        console.log(url); // Would see a path?

        this.setState({
            selectedFile: event.target.files[0],
            imageUploaded: 1
        });
    };

    handleImageSearch(url) {
        const filename = url.substring(url.lastIndexOf("/") + 1);
        console.log(filename);
        this.setState({
            mainState: "uploaded",
            imageUploaded: true,
            selectedFile: url,
            fileReader: undefined,
            filename: filename
        });
    }

    handleSeachClose = event => {
        this.props.setBackground('')
        // document.getElementById('graph-id-graph-wrapper').style.backgroundImage = '';
        this.setState({
            mainState: "initial"
        });
    };

    renderSearchState() {
        const { classes } = this.props;

        return (
            <div className={classes.searchRoot} >
                {/*<InputBase className={classes.searchInput} placeholder="Image URL" />*/}
                <ImageUploader  />

                <Divider className={classes.searchDivider} />
                <div
                    color="primary"
                    className={classes.secondaryButton}
                    aria-label="Close"
                    onClick={this.handleSeachClose}
                >
                    <CloseIcon />
                </div>
            </div>
        );
    }

    handleAvatarClick(value) {
        const filename = value.url.substring(value.url.lastIndexOf("/") + 1);
        console.log(filename);
        this.setState({
            mainState: "uploaded",
            imageUploaded: true,
            selectedFile: value.url,
            fileReader: undefined,
            filename: filename
        });
    }

    renderGalleryState() {
        const { classes } = this.props;
        let listItems = null;
        if(imageGallery){
            listItems = imageGallery.map(url => (
                <ImageListItem key={url}>
                    <img
                        onClick={value => this.handleAvatarClick({ url })}
                        src={url}
                        // alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
                // <div
                //     onClick={value => this.handleAvatarClick({ url })}
                //     style={{
                //         // padding: "5px 5px 5px 5px",
                //         cursor: "pointer"
                //     }}
                //
                //     key={url}
                // >
                //     <Avatar src={url} />
                // </div>
            ));

        }else{
            console.log("not read images data")
        }


        // const listItems = this.props.imageGallery.map(url => (
        //   <div
        //     onClick={value => this.handleAvatarClick({ url })}
        //     style={{
        //       padding: "5px 5px 5px 5px",
        //       cursor: "pointer"
        //     }}
        //   >
        //     <Avatar shape="square" size={100} src={url} />
        //   </div>
        // ));

        return (

                <Grid>
                    {listItems}
                    <div
                        color="primary"
                        className={classes.secondaryButton}
                        aria-label="Close"
                        onClick={this.handleSeachClose}
                    >
                        <ReplayIcon />
                    </div>
                </Grid>

        );
    }

    renderUploadedState() {
        const { classes, theme } = this.props;
        const handleSetImage = () => {
            this.props.setBackground(`${this.state.selectedFile}`)
            // document.getElementById('graph-id-graph-wrapper').style.backgroundImage = `url(${this.state.selectedFile})`
        }
        return (
            <div>
                <img

                    width="100%"
                    className={classes.media}
                    src={this.state.selectedFile}

                />
                <button autoFocus onClick={handleSetImage}>
                    Set background
                </button>
            </div>

        );
    }

    imageResetHandler = event => {
        console.log("Click!");
        this.setState({
            mainState: "initial",
            selectedFile: null,
            imageUploaded: 0
        });
    };

    render() {
        const { classes, theme } = this.props;

        return (

                <div className={classes.root}>
                        {(this.state.mainState === "initial" &&
                                this.renderInitialState()) ||
                            (this.state.mainState === "search" &&
                                this.renderSearchState()) ||
                            (this.state.mainState === "gallery" &&
                                this.renderGalleryState()) ||
                            (this.state.mainState === "uploaded" &&
                                this.renderUploadedState())}


                </div>

        );
    }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);
