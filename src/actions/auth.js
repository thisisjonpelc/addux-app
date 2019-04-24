import {LOGIN, LOGOUT, UPDATE_TOKEN, UPDATE_USER} from './types';

export const login = (user) => ({
    type:LOGIN,
    user
});

export const logout = () => ({
    type: LOGOUT
});

export const updateToken = (token) => ({
    type:UPDATE_TOKEN,
    token
});

export const updateUser = (updates) => ({
    type: UPDATE_USER,
    updates
});