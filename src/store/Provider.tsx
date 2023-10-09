import React, { useReducer, createContext, useMemo } from "react";

export const ReducerContext = createContext(null);

interface ReducerAction {
    type: string;
    payload: any;
}

const initialState: any = {
    route: 'main',
    all: [],
    allEvents: [],
    activeIdxEvent: 0
};

export function reducer(state: any, action: ReducerAction) {
    const { type, payload } = action;

    switch (type) {
        case 'updateRoute':
            return {
                ...state,
                route: payload
            };
        case 'addNew':
            return {
                ...state,
                all: [...state.all, payload]
            };
        case 'updateEvents':
            return {
                ...state,
                allEvents: payload
            };
        case 'updateEventIdx':
            return {
                ...state,
                activeIdxEvent: payload
            };
        default:
            return state;
    }
}

const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <ReducerContext.Provider value={contextValue}>
            {children}
        </ReducerContext.Provider>
    );
}

export default Provider;