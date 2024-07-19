import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();
// mistake was u used {} instead of ()

export const StateProvider = ({initialState,reducer,children})=>(
    <StateContext.Provider value={useReducer(reducer,initialState)} >
        {
        children 
        }
    </StateContext.Provider>)


export const useStateProvider = ()=>useContext(StateContext)