import {LOGIN, LOGOUT, UPDATE_TOKEN, UPDATE_USER} from './../actions/types';

const authReducerDefaultState = {};

const authReducer = (state = authReducerDefaultState, action) => {
    switch(action.type) {
        case LOGIN:
            return action.user;
        case LOGOUT:
            return {};
        case UPDATE_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case UPDATE_USER:
            return {
                ...state,
                ...action.updates
            }
        default:
            return state;
    }
}

export default authReducer;