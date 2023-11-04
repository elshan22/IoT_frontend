import {combineReducers} from "redux";
import leads from './leads.js'
import auth from "./auth.js";
import receiveData from './receiveData'
import errors from "./errors";
export default combineReducers({
    leads,
    auth,
    errors,
    receiveData,
});