import React from 'react';
import AuthContext from './AuthContext';
import { ACCESS_TOKEN, USER } from '../util/constants';

const initialState = {
    isAuthenticated: false,
}

const actions = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
}

function reducer(state, action) {
    switch (action.type) {
        case actions.LOGIN:
            localStorage.setItem(ACCESS_TOKEN, action.value.token);

            return {
                ...state,
                isAuthenticated: action.value.isAuthenticated,
            };
        case actions.LOGOUT:
            
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(USER);
            action.props.history.push("/login");

            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
};


export default function AuthProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const value = {
        authState: state.authState,
        setAuthState: value => {
            dispatch({ type: actions.LOGIN, value })
        },
        resetAuthState: props => {
            dispatch({ type: actions.LOGOUT, props })
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};
