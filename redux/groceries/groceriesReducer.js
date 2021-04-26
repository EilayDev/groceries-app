import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'groceriesReducer',
    initialState: {
        groceries: []
        
        /*
        grocery structure:
        {
            linkedTab: '',
            items: [
                {
                    itemName: '',
                    amount: '',
                    isChecked: false,
                },
            ]
        },
        */
    },
    reducers: {
        initializeGroceries: (state, action) => {
            state.groceries = action.payload;
        },
        toggleCheckGrocery:(state, action) => {
            const x = state.groceries.filter((item) => item.linkedTab === action.payload.linkedTab)[0]['items'][action.payload.index];
            x.isChecked = !x.isChecked;
        },
        addToGroceries: (state, action) => {
            state.groceries.push(action.payload)
        },
        removeGroceries: (state, action) => {
            state.groceries.splice(action.payload+1, 1)
        }
    },
});

// Export actions
export const { toggleCheckGrocery, initializeGroceries, addToGroceries, removeGroceries } = slice.actions;

// Export Selector
export const selectorGetGroceries = state => state.groceriesReducer.groceries;

export default slice.reducer;