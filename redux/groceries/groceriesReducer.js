import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'groceriesReducer',
    initialState: {
        groceries: []
    },
    reducers: {
        initializeGroceries: (state, action) => {
            state.groceries = action.payload;
        },
        toggleCheckGrocery:(state, action) => {
            const x = state.groceries[action.payload.selectedTab]['items'][action.payload.index];
            x.isChecked = !x.isChecked;
        }
    },
});

// Export actions
export const { toggleCheckGrocery, initializeGroceries } = slice.actions;

// Export Selector
export const selectorGetGroceries = state => state.groceriesReducer.groceries;

export default slice.reducer;