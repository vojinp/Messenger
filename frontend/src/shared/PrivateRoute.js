import React from 'react';
import { Route, Redirect } from "react-router-dom";
import TokenServie from '../services/tokenService';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      TokenServie.isAuthenticated()
        ? <Component {...props} />
        : <Redirect to='/log-in' />
    )} />
)

export default PrivateRoute;