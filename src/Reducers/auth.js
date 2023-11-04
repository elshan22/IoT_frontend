import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from '../Actions/types.js';
import {b64_to_utf8} from "./base64";
import {baseUrl} from "./../Actions/auth"

const initialState = {
    token_refresh: localStorage.getItem('token_refresh'),
    token_access: localStorage.getItem('token_access'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
};

export default function (state = initialState, action) {
    function getUserInfo() {
        const Http = new XMLHttpRequest();
        const url=baseUrl+'api/users/sendlastdata/';
        Http.open("GET", url);
        Http.send();

        localStorage.setItem('token_refresh',action.payload['refresh']);
        localStorage.setItem('token_access',action.payload['access'])
        let refresh_token = action.payload['refresh'];
        let user_payload = refresh_token.split('.')[1];
        user_payload = JSON.parse(b64_to_utf8(user_payload))
        localStorage.setItem('username', user_payload.user_name);
        localStorage.setItem('role', user_payload.role);
    }

    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            getUserInfo();
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN_SUCCESS:
            getUserInfo();
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };

        case REGISTER_SUCCESS:
            getUserInfo();
            return {
                ...state,
                ...action.payload,
                isAuthenticatedisAuthenticated: true,
                isLoading: false,
            };
        case AUTH_ERROR:
            console.log("auth error")
            return {
                ...state
            };
        case LOGIN_FAIL:
            console.log("login failed")
            return {
                ...state
            };
        case LOGOUT_SUCCESS:
            console.log("logout successful!")
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case REGISTER_FAIL:
            localStorage.removeItem('token_refresh');
            localStorage.removeItem('token_access');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        default:
            return state;
    }
}