import {configureStore} from "@reduxjs/toolkit";
import {productsSlice} from "./reducers/products";
import {apiUsers} from "./reducers/users";

const store = configureStore({
    reducer: {
        [productsSlice.reducerPath]: productsSlice.reducer,
        [apiUsers.reducerPath]: apiUsers.reducer
    },
    middleware: getDefaultMiddleware =>  getDefaultMiddleware()
        .concat(productsSlice.middleware)
        .concat(apiUsers.middleware),
})

export default store