import {configureStore} from '@reduxjs/toolkit';
import { useMemo } from 'react'
import drawerReducer from './drawer/drawerReducer';
import groceriesReducer from './groceries/groceriesReducer';

const createStore = (preloadedState) => {
    return configureStore({
        reducer: {
            drawerReducer: drawerReducer,
            groceriesReducer: groceriesReducer
        },
        preloadedState
    })
}

let store;
export const initializeStore = (preloadedState) => {
    let _store = store ?? createStore(preloadedState);
  
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
