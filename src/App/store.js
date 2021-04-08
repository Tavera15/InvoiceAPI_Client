import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from "./AuthSlicer";

const store = configureStore({
    reducer:{
        AuthSlice: AuthSlice
    },
})

export default store;