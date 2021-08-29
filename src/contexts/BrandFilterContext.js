import React from 'react';

export const BrandFilterContext = React.createContext();

const initialState = {
    selectedBrands: []
}

const actions = {
    SET_SELECTED_BRANDS: "SET_SELECTED_BRANDS",
    RESET: "RESET"
}

function reducer(state, action) {
    switch (action.type) {
        case actions.SET_SELECTED_BRANDS:
            return { ...state, selectedBrands: action.value };
        case actions.RESET:
            return { ...state, ...initialState };
        default:
            return state;
    }
};

export default function BrandilterProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const value = {
        selectedBrands: state.selectedBrands,
        setSelectedBrands: value => {
            dispatch({ type: actions.SET_SELECTED_BRANDS, value })
        },
        resetSelectedBrands: () => {
            dispatch({ type: actions.RESET })
        }
    };

    return (<BrandFilterContext.Provider value={value}>
        {children}
    </BrandFilterContext.Provider>
    )
};
