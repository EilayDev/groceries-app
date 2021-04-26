import {configureStore} from '@reduxjs/toolkit';
import { useMemo } from 'react'
import drawerReducer from './drawer/drawerReducer';
import groceriesReducer from './groceries/groceriesReducer';
import { useSelector, useDispatch } from 'react-redux';
import {selectorGetLists} from '../redux/drawer/drawerReducer'

async function update(state, actionType) {
    const reducer = actionType.split('/')[0]
    const newData = state[reducer];
    const response = await fetch('/api/update', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    console.log(response)
}

const HelloMiddleware = storeAPI => next => action => {
    next(action)
    if (action.type != "drawerReducer/setSelectedTab"
    && !action.type.includes("initialize")){
        update(storeAPI.getState(), action.type)
    }
}

const createStore = (preloadedState) => {
    return configureStore({
        reducer: {
            drawerReducer: drawerReducer,
            groceriesReducer: groceriesReducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .concat(HelloMiddleware),
        preloadedState
    })
}

let store;
export const initializeStore = (preloadedState) => {
    let _store = store ?? createStore(preloadedState, );
  
    if (preloadedState && store) {
     _store = createStore({ ...store.getState(), ...preloadedState });
      store = undefined;
    }
  
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;
    // Create the store once in the client
    if (!store) store = _store;
  
    return _store;
};

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
