import {INITIALIZE_APP, SET_ADDUXES, EDIT_ADDUX, EDIT_COMMENT, ADD_ADDUX, DELETE_ADDUX, LOGOUT} from './../actions/types';
import {isEmptyObject} from './../utils/utils';

const adduxReducerDefaultState = {};

const adduxReducer = (state = adduxReducerDefaultState, action) => {
    
    let newState, id;

    switch(action.type){

        case INITIALIZE_APP:
        case SET_ADDUXES:
            newState = {}
        
            action.adduxes.forEach(function(element) {
                newState[element._id] = element;
            });

            return newState;
        case EDIT_ADDUX:
           id = action.activeAddux;
           let newAddux = {
               ...state[id],
               ...action.updates
           }

           newState = {
               ...state,
           }

           newState[id] = newAddux;
        
           return newState;
        case EDIT_COMMENT:
           newState = {
               ...state
           };

           if(!(isEmptyObject(newState))){
                newState[action.adduxId][action.commentId].text=action.text;
           }

           return newState;

        case ADD_ADDUX:
           newState = {
               ...state
           };

           newState[action.addux._id] = action.addux;

           return newState;
        case DELETE_ADDUX:
           newState = {};
           id = action.id;

           for(let key in state){
                if(key !== id){
                    newState[key] = state[key];
                }
           }

           return newState;
        case LOGOUT:
           return {};
        default:
            return state;
    }
}

export default adduxReducer;