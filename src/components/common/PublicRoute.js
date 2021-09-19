import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUserAuthenticated } from '../../util/authUtils';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {

    const isAuthenticated = isUserAuthenticated();

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isAuthenticated && restricted ? <Redirect to="/profile" /> : <Component {...props} />
        )} />
    );
};

export default PublicRoute;