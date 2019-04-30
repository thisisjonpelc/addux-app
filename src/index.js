import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Provider} from 'react-redux';

import AppRouter from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';

import {login} from './actions/auth';

import configureStore from "./store/configureStore";

import "./styles/main.scss";

const store = configureStore();
const tokenExists = (typeof localStorage !== 'undefined') && (localStorage.getItem('AUTH_TOKEN') !== null);

//console.log(store);

const renderApp = () => {
    const jsx = (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );

    ReactDOM.render(jsx, document.getElementById('root'));
}

if(tokenExists){

    console.log('Token exists!');

    ReactDOM.render(<LoadingPage />, document.getElementById('root'));    

    try{
        const token = localStorage.getItem('AUTH_TOKEN');
        console.log('Token is', token);
        axios.post('/users/login', 
            {},
            {
                headers:{
                    'x-auth': token
            }
        })
        .then((response) => {
            console.log('Logged in!');
            store.dispatch(login(
                {
                    ...response.data, 
                    token:response.headers['x-auth']
                }
            ));

            //RENDER APP

            renderApp();
        })
        .catch((err) => {
            //TODO: Dispatch Error Event
            console.log('Login failed! Token Expired. Rendering App!');
            renderApp();
        });
    }
    catch(err){
        console.log('Could not load local authorization token');
        renderApp();
    }
}
else{
    //RENDER APP LIKE USUAL
    renderApp();
}