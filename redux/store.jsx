import {configureStore} from '@reduxjs/toolkit';
import drawerReducer from './drawer/drawerReducer';
import groceriesReducer from './groceries/groceriesReducer';

export default configureStore({
    reducer: {
        drawerReducer: drawerReducer,
        groceriesReducer: groceriesReducer
    }
})

