import {LOGIN, LOGOUT} from './../actions/types';

export const saveAuthToken = store => next => action => {

    switch(action.type){
        case LOGIN:
            try{
                localStorage.setItem('AUTH_TOKEN', action.user.token);
            }
            catch(err){

            }
            break;
        case LOGOUT:
            try{
                localStorage.removeItem('AUTH_TOKEN');
            }
            catch(err){

            }
            break;
        default:
            break;
    }

    return next(action);
}