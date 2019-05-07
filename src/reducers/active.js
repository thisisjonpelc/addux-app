import {INITIALIZE_APP, SET_ACTIVE, ADD_ADDUX, DELETE_ADDUX} from '../actions/types';

const activeReducer = (state = null, action) => {
    switch(action.type){
        case INITIALIZE_APP:
            return action.adduxes[0]._id;
        case SET_ACTIVE:
            return action.id;
        case ADD_ADDUX:
            return action.addux._id;
        case DELETE_ADDUX:
            if(action.newActive){
                return action.newActive
            }
        default:
            return state;
    }
}

export default activeReducer;