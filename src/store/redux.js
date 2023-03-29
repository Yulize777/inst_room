import {configureStore,combineReducers} from "@reduxjs/toolkit";
import {productsSlice} from "./reducers/products";
import {apiUsers} from "./reducers/users";
import usersSlice from "./reducers/usersSlice";
import storage from 'redux-persist/lib/storage'
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import {orderApi} from "./reducers/orders";
const rootReducer = combineReducers({
    usersSlice: usersSlice
})
const persistConfig = {
    key: 'root',
    storage
}
const persistedReducer = persistReducer(persistConfig,rootReducer)
const store = configureStore({
    reducer: {
        persistedReducer,
        [productsSlice.reducerPath]: productsSlice.reducer,
        [apiUsers.reducerPath]: apiUsers.reducer,
        [orderApi.reducerPath]: orderApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(productsSlice.middleware)
            .concat(apiUsers.middleware)
            .concat(orderApi.middleware),
})

export const persistor = persistStore(store)
export default store