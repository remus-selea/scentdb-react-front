import React from 'react';

export const PerfumeTypeFilterContext = React.createContext();

const initialState = {
    perfumeTypes: []
}

const actions = {
    SET_PERFFUME_TYPES: "SET_PERFFUME_TYPES",
    RESET: "RESET"
}

function reducer(state, action) {
    switch (action.type) {
        case actions.SET_PERFFUME_TYPES:
            return { ...state, perfumeTypes: action.value };
        case actions.RESET:
            return { ...state, ...initialState };
        default:
            return state;
    }
};

export default function GenderFilterProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const value = {
        perfumeTypes: state.perfumeTypes,
        setPerfumeTypes: value => {
            dispatch({ type: actions.SET_PERFFUME_TYPES, value })
        },
        resetPerfumeTypes: () => {
            dispatch({ type: actions.RESET })
        }
    };

    return (<PerfumeTypeFilterContext.Provider value={value}>
        {children}
    </PerfumeTypeFilterContext.Provider>
    )
};
