import { GET_ERRORS } from '../Actions/types';

const initialState = {
    msg: [],
    status: [],
    id:[]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            // console.log("saved error "+action.payload.msg)
            return {
                msg: [...state.msg,action.payload.msg],
                status: [...state.status,action.payload.status],
                id: [...state.id,action.payload.id]
            };
        default:
            return state;
    }
}
