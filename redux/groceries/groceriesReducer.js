import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'groceriesReducer',
    initialState: {
        groceries: [
            {
                linkedTab: 'Default',
                items: [
                    {
                        itemName: 'Tuna',
                        amount: '1',
                        isChecked: false,
                    },
                    {
                        itemName: 'Jelly',
                        amount: '4',
                        isChecked: false,
                    },
                    {
                        itemName: 'Ramen',
                        amount: '20',
                        isChecked: false,
                    }
                ]
            },
            {
                linkedTab: 'AnotherOne',
                items: [
                    {
                        itemName: 'Apples',
                        amount: '6',
                        isChecked: false,
                    },
                    {
                        itemName: 'eggs',
                        amount: '2',
                        isChecked: false,
                    },
                    {
                        itemName: 'Potato',
                        amount: '1',
                        isChecked: false,
                    }
                ]
            }
        ]
    },
    reducers: {
        
    },
});

// Export actions
export const {  } = slice.actions;

// Export Selector
export const selectorGetGroceries = state => state.groceriesReducer.groceries;

export default slice.reducer;