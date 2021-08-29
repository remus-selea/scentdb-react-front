import React from 'react';

export const GenderFilterContext = React.createContext();

const initialState = {
    genders: []
}

const actions = {
    SET_GENDERS: "SET_GENDERS",
    RESET: "RESET"
}

function reducer(state, action) {
    switch (action.type) {
        case actions.SET_GENDERS:
            return { ...state, genders: action.value };
        case actions.RESET:
            return { ...state, ...initialState };
        default:
            return state;
    }
};

export default function GenderFilterProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const value = {
        genders: state.genders,
        setGenders: value => {
            dispatch({ type: actions.SET_GENDERS, value })
        },
        resetGenders: () => {
            dispatch({ type: actions.RESET })
        }
    };

    return (<GenderFilterContext.Provider value={value}>
        {children}
    </GenderFilterContext.Provider>
    )
};
