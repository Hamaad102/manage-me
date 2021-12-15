import { createSlice } from '@reduxjs/toolkit'

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
        inventoryPage: '',
        addPage: 'category',
        categoryPage: '',
        editPage: '',
        salesPage: ''
    },
    reducers: {
        setInventoryPage: (state, action) => {
            state.inventoryPage = action.payload
        },
        setAddPage: (state, action) => {
            state.addPage = action.payload
        },
        setCategoryPage: (state, action) => {
            state.categoryPage = action.payload
        },
        setEditPage: (state, action) => {
            state.editPage = action.payload
        },
        setSalesPage: (state, action) => {
            state.salesPage = action.payload
        },
        setDefaultNavigation: state => {
            state.inventoryPage = ''
            state.addPage = 'category'
            state.categoryPage = ''
            state.editPage = ''
            state.salesPage = ''
        }
    },
})

// Action creators are generated for each case reducer function
export const { setInventoryPage, setAddPage, setCategoryPage, setEditPage, setSalesPage, setDefaultNavigation } = navigationSlice.actions

export default navigationSlice.reducer