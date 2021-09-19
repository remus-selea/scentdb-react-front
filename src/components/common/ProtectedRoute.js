import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUserAuthenticated } from '../../util/authUtils';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const isAuthenticated = isUserAuthenticated();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated) {
                    return <Component {...rest} {...props} />;
                } else {
                    return (
                        <Redirect to={{ pathname: "/login", state: props.location }} />
                    );
                }
            }}
        />
    );

}



export default ProtectedRoute;
