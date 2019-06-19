import axios from 'axios';

import { LOGIN, LOGOUT, UPDATE_USER } from './types';
import { history } from './../routers/AppRouter';

export const login = (user) => ({
    type: LOGIN,
    user
});

export const logout = () => ({
    type: LOGOUT
});

export const updateUser = (updates) => ({
    type: UPDATE_USER,
    updates
});

export const startUpdateUser = (id, updates) => async (dispatch, getState) => {
    const { token } = getState().auth;

    try {
        axios.patch(`/users/${id}`, updates, { headers: { 'x-auth': token } });
        dispatch(updateUser(updates));
    }
    catch (err) {
        if (err.response.status === 402) {
            //Unsubscribe?
            history.push('/subscribe');
        }
        else if (err.response.status === 401) {
            dispatch(logout());
            history.push('/login');
        }
        else {
            //TODO: Error notification
        }
    }

}