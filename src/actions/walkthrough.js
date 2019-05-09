import axios from 'axios';

import {SET_WALKTHROUGH} from './types';

export const setWalkthrough = (walkthrough) => {
    return {
        type:SET_WALKTHROUGH,
        walkthrough
    };
}

export const startSetWalkthrough = (walkthrough) => async (dispatch, getState) => {

    const {token} = getState().auth;

    try{
        const response = await axios.post(`/walkthrough`, walkthrough, {headers:{'x-auth': token}});

        dispatch(setWalkthrough(response.data));
    }
    catch(err){
        //ERROR NOTIFICATION
        console.log('Error setting walkthrough');
        console.log(err);
    }

}