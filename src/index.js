import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Provider} from 'react-redux';

import AppRouter from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';

import {login} from './actions/auth';

import configureStore from "./store/configureStore";

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
    ReactDOM.render(<LoadingPage />, document.getElementById('root'));    

    try{
        const token = localStorage.getItem('AUTH_TOKEN');
        axios.post('/users/login', 
            {},
            {
                headers:{
                    'x-auth': token
            }
        })
        .then((response) => {
            console.log('Logged in!');
            store.dispatch(login(response.data));

            //RENDER APP

            renderApp();
        })
        .catch((err) => {
            //TODO: Dispatch Error Event

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