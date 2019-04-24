import {SET_ACTIVE, ADD_ADDUX} from '../actions/types';

const activeReducer = (state = null, action) => {
    switch(action.type){
        case SET_ACTIVE:
            return action.id;
        case ADD_ADDUX:
            return action.addux._id;
        default:
            return state;
    }
}

export default activeReducer;