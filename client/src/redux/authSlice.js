import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: '',
        retrieve: true
    },
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        },
        setRetrieve: (state, action) => {
            state.retrieve = action.payload
        },
        logout: state => { }
    }
})

// Action creators are generated for each case reducer function
export const { setId, setRetrieve, logout } = authSlice.actions

export default authSlice.reducer