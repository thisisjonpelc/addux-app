import axios from 'axios';

import { INITIALIZE_APP } from './types';
import {logout} from './auth';
import {history} from './../routers/AppRouter';

export const initializeApp = (adduxes, walkthrough) => {

    return {
        type: INITIALIZE_APP,
        adduxes,
        walkthrough
    };
};

export const startInitializeApp = () => async (dispatch, getState) => {
    const { token } = getState().auth;

    try {
        const adduxResponse = await axios.get('/addux', { headers: { 'x-auth': token } });
        const walkthroughResponse = await axios.get('/walkthrough');
        
        dispatch(initializeApp(adduxResponse.data.adduxes, walkthroughResponse.data));
    }
    catch (err) {
        console.log(err);

        if (err.response.status === 402) {
            //Unsubscribe?
            history.push('/subscribe');
        }
        else if (err.response.status === 401) {
            dispatch(logout());
            history.push('/login');
        }
        else {
            //TODO: Error Notification
            console.log('Error Initializing App!');
            console.log(err);
        }
    }



}