import { createSlice } from '@reduxjs/toolkit'

export const databaseSlice = createSlice({
    name: 'database',
    initialState: {
        categories: [],
        items: [],
        sales: [],
        onlineSales: [],
        newOrders: []
    },
    reducers: {
        setInitialCategories: (state, action) => {
            state.categories = action.payload
        },
        setInitialItems: (state, action) => {
            state.items = action.payload
        },
        setSales: (state, action) => {
            state.sales = action.payload
        },
        setNewOrders: (state, action) => {
            state.newOrders = action.payload
        },
        setOnlineSales: (state, action) => {
            state.onlineSales = action.payload
        },
        setCategories: (state, action) => {
            state.categories = [...state.categories, action.payload]
        }
    },
})

// Action creators are generated for each case reducer function
export const { setInitialCategories, setInitialItems, setSales, setOnlineSales, setNewOrders, setCategories } = databaseSlice.actions

export default databaseSlice.reducer