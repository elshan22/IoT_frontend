import axios from 'axios';
import { returnErrors } from './messages.js';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types';
import {HOST_URL} from "../settings";

export const baseUrl = HOST_URL+'/';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });
    axios
        .post(baseUrl+'api/users/token/refresh/' , {refresh: localStorage.getItem('token_refresh')},tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR,
            });
        });
};

// LOGIN USER
export const login = (email, password) => (dispatch) => {
    if(email === undefined || password === undefined){
        console.log("undefined");
        return;
    }
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    axios
        .post(baseUrl+'api/users/login/', {email: email, password: password}, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL,
            });
        });
};

// REGISTER USER
export const register = ({ username, password, email }) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ username, email, password });

    axios
        .post('/api/auth/register', body, config)
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL,
            });
        });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios
        .post(baseUrl+'api/users/logout/', {refresh: localStorage.getItem('token_refresh')})
        .then((res) => {
            dispatch({ type: 'CLEAR_LEADS' });
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token_access;
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `JWT ${token}`;
    }

    return config;
};