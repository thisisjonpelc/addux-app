import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
//import {Provider} from "react-redux";

//import AppRouter from "./routers/AppRouter";
import LoadingPage from './components/LoadingPage';

import {login} from './actions/auth';

import configureStore from "./store/configureStore";

const store = configureStore();
const tokenExists = (typeof localStorage !== 'undefined') && (localStorage.getItem('AUTH_TOKEN') !== null);

console.log(store);

if(tokenExists){
    ReactDOM.render(<LoadingPage />, document.getElementById('root'));    

    let token;
    try{
        token = localStorage.getItem('AUTH_TOKEN');
    }
    catch(err){
        console.log('Could not load local authorization token');
    }

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
    })
    .catch((err) => {

    });
}
else{
    //RENDER APP LIKE USUAL

}

// const jsx = (
//     <Provider store={store}>
//         <AppRouter />
//     </Provider>
// );

// ReactDOM.render(jsx, document.getElementById('app'));