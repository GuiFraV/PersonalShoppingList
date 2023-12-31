import { createContext, useCallback, useReducer } from 'react';
import useDataFetching from '../hooks/useDataFetching';


export const ListsContext = createContext();

const initialState = {
    lists: [],
    loading: true,
    error: '',
}

const reducer = (state, action) => {
    switch (action.type){
        case 'GET_LISTS_SUCCESS':
            return {
                ...state,
                lists: action.payload,
                loading: false,
            };
        case 'GET_LISTS_ERROR':
            return {
                ...state,
                lists: [],
                loading: false,
                error: action.payload,
            };
            default:
                return state;
    }
}

export const ListsContextProvider = ({ children }) => {
    // const [loading, error, data] = useDataFetching('https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists',);
    
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchLists = useCallback(async () => {
        try {
            const data = await fetch(`https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists`);
            const result = await data.json();

            if(result){
                dispatch({ type: 'GET_LISTS_SUCCESS', payload: result });
            }
        }catch(e){
            dispatch({ type: 'GET_LISTS_ERROR', payload: e.message });
        }

    }, [])
    
    return (
        <ListsContext.Provider 
            value={{ ...state, fetchLists }}>
            {children}
        </ListsContext.Provider>
    );
};



export default ListsContext;