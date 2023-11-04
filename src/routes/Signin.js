import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axiosInstance from '../api.js';
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {login} from '../Actions/auth.js'

import Background from './10.jpg';
import Paper from "@mui/material/Paper";
// {backgroundImage: "url(" + { Background } + ")"}
const theme = createTheme();

class MyComponent extends Component {
    state = {
        username: '',
        password: '',
    };

    static propTypes = {
        // login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        if(this.props.isAuthenticated){
            return <Redirect to="/admin" />;
        }
        const { email, password } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <div className='m-0' >
                    <Container component="main" maxWidth="xs" className="bg-white rounded-lg px-5 shadow-lg" style={{marginTop:`0px`}}>
                        <CssBaseline />
                        <Box
                            className="py-5"
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={this.onSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={this.onChange}
                                    // value={email}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.onChange}
                                    // value={password}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign in
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2" className="bg-red-600 text-white text-decoration-none p-2 rounded-md transition duration-300 ease-in-out hover:bg-red-700 hover:transition hover:duration-300 hover:ease-in-out hover:shadow-lg">
                                            Forgot password
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </div>
            </ThemeProvider>
        );
    }
}


const mapStateToProps = state=>({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect (mapStateToProps,{login})(MyComponent);
