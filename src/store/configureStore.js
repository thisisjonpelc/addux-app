import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import reduxThunk from 'redux-thunk';

import {saveAuthToken} from './../middleware/middleware';

import adduxReducer from './../reducers/addux';
import authReducer from './../reducers/auth';
import walkthroughReducer from './../reducers/walkthrough';
import activeReducer from '../reducers/active';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {

    const store = createStore(
        combineReducers({
            addux: adduxReducer,
            auth: authReducer,
            walkthrough: walkthroughReducer,
            //subscription: subscriptionReducer,
            active:activeReducer
        }),
        composeEnhancers(applyMiddleware(saveAuthToken, reduxThunk))
    );

    return store;
};