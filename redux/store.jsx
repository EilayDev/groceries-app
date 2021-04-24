import {configureStore} from '@reduxjs/toolkit';
import drawerReducer from './drawer/drawerReducer';

export default configureStore({
    reducer: {
        drawerReducer: drawerReducer
    }
})

