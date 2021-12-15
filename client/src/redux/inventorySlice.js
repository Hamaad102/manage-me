import { createSlice } from '@reduxjs/toolkit'

export const inventorySlice = createSlice({
    name: 'addInventory',
    initialState: {
        selectedCategory: ['', null, null],
        item: '',
        price: 0.00,
        quantity: 0,
        tags: [],
        shoppingCart: []
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
        setShoppingCart: (state, action) => {
            state.shoppingCart = action.payload
        },
        setMetaData: (state, action) => {
            state.item = action.payload.item
            state.price = action.payload.price
            state.quantity = action.payload.quantity
            state.tags = action.payload.tags
        },
        setDefaultMetaData: state => {
            state.selectedCategory = ['', null, null]
            state.item = ''
            state.price = 0.00
            state.quantity = 0
            state.tags = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { setSelectedCategory, setShoppingCart, setMetaData, setDefaultMetaData } = inventorySlice.actions

export default inventorySlice.reducer