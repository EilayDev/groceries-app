import { createSlice } from '@reduxjs/toolkit';
import {selectorGetSelectedTab} from '../drawer/drawerReducer'
import { useSelector } from "react-redux";
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
                        amount: '60',
                        isChecked: false,
                    }
                ]
            },
            {
                linkedTab: 'Saturday',
                items: [
                    {
                        itemName: 'Milk',
                        amount: '1',
                        isChecked: false,
                    },
                    {
                        itemName: 'Banana',
                        amount: '2',
                        isChecked: false,
                    },
                    {
                        itemName: 'Water',
                        amount: '60',
                        isChecked: false,
                    }
                ]
            },
        ]
    },
    reducers: {
        toggleCheckGrocery:(state, action) => {
            const x = state.groceries[action.payload.selectedTab]['items'][action.payload.index];
            x.isChecked = !x.isChecked;
        }
    },
});

// Export actions
export const { toggleCheckGrocery } = slice.actions;

// Export Selector
export const selectorGetGroceries = state => state.groceriesReducer.groceries;

export default slice.reducer;