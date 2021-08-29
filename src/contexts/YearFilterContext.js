import React from 'react';
import { minYear, maxYear } from '../util/constants'

export const YearFilterContext = React.createContext();

const initialState = {
    yearRangeValues: [minYear, maxYear]
}

const actions = {
    SET_YEAR_RANGE: "SET_YEAR_RANGE",
    RESET: "RESET"
}

function reducer(state, action) {
    switch (action.type) {
        case actions.SET_YEAR_RANGE:
            return { ...state, yearRangeValues: action.value };
        case actions.RESET:
            return { ...state, ...initialState };
        default:
            return state;
    }
};

export default function YearFilterProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const value = {
        yearRangeValues: state.yearRangeValues,
        setYearRangeValues: value => {
            dispatch({ type: actions.SET_YEAR_RANGE, value })
        },
        resetYearRangeValues: () => {
            dispatch({ type: actions.RESET })
        }
    };

    return (<YearFilterContext.Provider value={value}>
        {children}
    </YearFilterContext.Provider>
    )
};