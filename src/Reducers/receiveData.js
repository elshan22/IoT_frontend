import {
    RECEIVE_DATA_NODE_TEM,
    RECEIVE_DATA_CONFIG,
    RECEIVE_NOTIFICATION,
    RECEIVE_PICHART,
    RECEIVE_ROOMTEMP,
    RECEIVE_NODETEMP,
    RECEIVE_SETNODE,
    RECEIVE_COLOR,
    RECEIVE_MAXTEMP,
    RECEIVE_MINTEMP,
    RECEIVE_SHORTDETAIL,
} from '../Actions/types.js';

const initialState={
    config: [],
    time: [],
    temp: [],
    notification: [],
    pychart: [],
    roomTemp: [],
    listNodes:[],
    lastTime: "",
    lastTemp: "",
    shortDetail:{},
    countFan: 0,
    colors :[],
    idMax: "",
    idMin:"",
    tempMax:"",
    tempMin:"",



}
function createData(time, amount) {
    return { time, amount };
}
export default function(state=initialState,action){
    switch (action.type){
        case RECEIVE_DATA_CONFIG:
            return {
                ...state,
                config: action.payload
            };
        case  RECEIVE_DATA_NODE_TEM:
            const obj = JSON.parse(action.payload)
            console.log((obj))
            return{
              ...state,
                time: [...state.time, obj],
                temp: [...state.temp, action.payload]
            };
        case RECEIVE_NOTIFICATION:
            return {
                ...state,
                notification: action.payload
            };
        case RECEIVE_PICHART:
            return {
                ...state,
                pychart: action.payload
            };
        case RECEIVE_ROOMTEMP:
            let msg = JSON.parse(action.payload)
            return {
                ...state,
                roomTemp: [...state.roomTemp,createData(msg.date,msg.tem)]
            };
        case RECEIVE_NODETEMP:
            let msgNode = (action.payload)
            console.log("in receive")
            console.log(action.payload)
            console.log(msgNode['times'])
            console.log(msgNode['temps'])
            return {
                ...state,
                time: msgNode['times'],
                temp: msgNode['temps'],
                lastTime: msgNode['times'][msgNode['times'].length-1],
                lastTemp: msgNode['temps'][msgNode['temps'].length-1]
            }
        case RECEIVE_SETNODE:
            console.log("Fas")
            let lnodes = (action.payload)
            console.log("hello")
            console.log(lnodes)
            return {
                ...state,
                listNodes: lnodes
            }
        case RECEIVE_COLOR:
            console.log("colors")
            console.log(action.payload)
            return {
                ...state,
                colors: action.payload
            };
        case RECEIVE_MAXTEMP:
            console.log("RECEIVE_MAXTEMP")
            console.log(action.payload["temp"])
            return {
                ...state,
                tempMax: action.payload["temp"],
                idMax: action.payload["id"]
            };
        case RECEIVE_MINTEMP:
            console.log("RECEIVE_MINTEMP")
            console.log(action.payload)
            return {
                ...state,
                tempMin: action.payload["temp"],
                idMin: action.payload["id"]
            };
        case RECEIVE_SHORTDETAIL:
            console.log("RECEIVE_SHORTDETAIL")
            return {
                ...state,
                shortDetail: action.payload
            };
        default:
            return state;
    }
}