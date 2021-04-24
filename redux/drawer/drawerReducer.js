import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'drawerReducer',
    initialState: {
        isOpen: false,
        selectedTab: 0,
        lists: [
            {
                label: "Default"
            },
            {
                label: "AnotherOne"
            },
        ]
    },
    reducers: {
        openDrawer: state => {
            state.isOpen = true;
        },
        closeDrawer: state => {
            state.isOpen = false;
        },
        addToLists: (state, action) => {
            state.lists.push(action.payload);
        },
        removeSelectedTab: state => {
            state.lists = state.lists.filter((_e, i) => i != state.selectedTab)
        },
        setSelectedTab: (state, action) => {
            state.selectedTab = action.payload;
        }
    }
});

// Export actions
export const { openDrawer, closeDrawer, addToLists, removeSelectedTab, setSelectedTab } = slice.actions;

// Export Selector
export const selectorIsOpen = state => state.drawerReducer.isOpen;
export const selectorGetLists = state => state.drawerReducer.lists;
export const selectorGetSelectedTab = state => state.drawerReducer.selectedTab;

export default slice.reducer;