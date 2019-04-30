import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {StripeProvider} from 'react-stripe-elements';

import AdduxWrapper from "../components/AdduxWrapper";
import SubscribePage from './../components/SubscribePage';
import ResetRequestPage from './../components/ResetRequestPage';
import ResetPasswordPage from './../components/ResetPasswordPage';
import ShareAddux from './../components/ShareAddux';
import SalesPage from '../components/SalesPage';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import SignUpPage from '../components/SignUpPage';

export const history = createHistory();

const AppRouter = () => {
     return (
            <StripeProvider apiKey='pk_test_qgZDzGYlsNzbuloTnIPK3KEc'>
                <Router history={history}>
                    <Switch>
                        <Route path="/" component={AdduxWrapper} exact={true} />
                        <Route path='/share/:id' render={(props) => <ShareAddux {...props} showComments={false} />} />
                        <Route path='/comment/:id' render={(props) => <ShareAddux {...props} showComments={true} />} />
                        <PrivateRoute path="/subscribe" component={SubscribePage} />
                        <PublicRoute path='/offer/eg187' component={SalesPage}/>
                        <PublicRoute path='/signup/:plan' component={SignUpPage} />
                        <PublicRoute path='/reset' component={ResetRequestPage} exact={true} />
                        <PublicRoute path='/reset/:token' component={ResetPasswordPage} />
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </StripeProvider>
        );
}

export default AppRouter;