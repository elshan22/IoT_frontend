import axios from 'axios';

import {
    RECEIVE_DATA_NODE_TEM,
    RECEIVE_DATA_CONFIG,
    RECEIVE_NOTIFICATION,
    RECEIVE_PICHART,
    RECEIVE_ROOMTEMP,
    RECEIVE_SETNODE,
    RECEIVE_COLOR,
    RECEIVE_MAXTEMP,
    RECEIVE_MINTEMP,
    RECEIVE_SHORTDETAIL,
    RECEIVE_NODETEMP
} from "./types";

// GET LEADS

export const receiveDataNodeTem = (data) => (dispatch) => {
        dispatch({
            payload: data,
            type: RECEIVE_DATA_NODE_TEM
        })
}
export const receiveDataConfig = (data) => (dispatch) => {
    console.log(data)
    dispatch({
        payload: data,
        type: RECEIVE_DATA_CONFIG
    })
}

export const receiveNotification = (data) => (dispatch) => {
    dispatch({
        payload: data,
        type: RECEIVE_NOTIFICATION
    })
}
export const receivePiechart = (data) => (dispatch) => {
    dispatch({
        payload: data,
        type: RECEIVE_PICHART
    })
}
export const receiveRoomTemp = (data) => (dispatch) => {
    dispatch({
        payload: data,
        type: RECEIVE_ROOMTEMP
    })
}
export const receiveNodeTemp = (data) => (dispatch) => {
    dispatch({
        payload: data,
        type: RECEIVE_NODETEMP
    })
}

export const setNodes = (data) => (dispatch) => {
    console.log("fadayat shavam22...")
    console.log(data)
    dispatch({
        payload: data,
        type: RECEIVE_SETNODE
    })
}

export const receiveColor = (data) => (dispatch) => {
    dispatch({
        payload: data,
        type: RECEIVE_COLOR
    })
}

export const receiveMaxTemp = (data) => (dispatch) => {
    dispatch({
        payload: data,
        type: RECEIVE_MAXTEMP
    })
}

export const receiveMinTemp = (data) => (dispatch) => {
    dispatch({
        payload: data,
        type: RECEIVE_MINTEMP
    })
}
export const receiveShortDetail = (data) => (dispatch) => {
    console.log("receive short detail")
    dispatch({
        payload: data,
        type: RECEIVE_SHORTDETAIL
    })
}