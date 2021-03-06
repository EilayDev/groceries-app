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
        updateGrocery: (state, action) => {
            const x = state.groceries.filter((item) => item.linkedTab === action.payload.linkedTab)[0]['items'][action.payload.index];
            if (x){
                x.isChecked = action.payload.checkStatus;
                x.itemName = action.payload.itemName;
                x.amount = action.payload.amount;
            }
        },
        addToGroceries: (state, action) => {
            state.groceries.push(action.payload)
        },
        addToGroceriesAt: (state, action) => {
            const x = state.groceries.filter(item => item.linkedTab === action.payload.name)[0]['items'].push(action.payload.item)
        },
        removeGroceries: (state, action) => {
            state.groceries.splice(action.payload, 1)
        }
    },
});

// Export actions
export const { updateGrocery, toggleCheckGrocery, initializeGroceries, addToGroceries, removeGroceries, addToGroceriesAt } = slice.actions;

// Export Selector
export const selectorGetGroceries = state => state.groceriesReducer.groceries;

export default slice.reducer;