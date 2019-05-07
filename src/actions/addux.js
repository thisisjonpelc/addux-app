import axios from 'axios';

import { SET_ADDUXES, EDIT_ADDUX, EDIT_COMMENT, ADD_ADDUX, DELETE_ADDUX } from './types';
import {logout} from './auth';
import { history } from './../routers/AppRouter';



export const setAdduxes = (adduxes) => {

    return {
        type: SET_ADDUXES,
        adduxes
    };
};

export const editAddux = (activeAddux, updates) => {
    return {
        type: EDIT_ADDUX,
        activeAddux,
        updates
    }
};

export const startEditAddux = (activeAddux, updates) => async (dispatch, getState) => {
    const { token } = getState().auth;

    try{
        const response = await axios.patch(`/addux/${activeAddux}`, updates, {headers:{'x-auth':token}});
    
        dispatch(editAddux(activeAddux, updates));
    }
    catch(err){
        console.log('Error!');

        if (err.response.status === 402) {
            //this.props.unsubscribe();
            history.push('/subscribe');
        }
        else if (err.response.status === 401) {
            dispatch(logout());
            history.push('/login');
        }
        else{
            //TODO: Error notification
        }
    }
}

export const editComments = (adduxId, commentId, text) => {
    return {
        type: EDIT_COMMENT,
        adduxId,
        commentId,
        text
    }
};

export const addAddux = (addux) => {
    return {
        type: ADD_ADDUX,
        addux
    }
};

export const deleteAddux = (id) => {
    return {
        type: DELETE_ADDUX,
        id
    }
}