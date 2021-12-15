import { configureStore, combineReducers } from '@reduxjs/toolkit'
import navigationReducer from './navigationSlice'
import databaseReducer from './databaseSlice'
import inventoryReducer from './inventorySlice'
import authReducer from './authSlice'

const combinedReducer = combineReducers({
    navigation: navigationReducer,
    database: databaseReducer,
    addInventory: inventoryReducer,
    auth: authReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'auth/logout') {
        state = undefined;
    }
    return combinedReducer(state, action);
};


export default configureStore({
    reducer: rootReducer,
})