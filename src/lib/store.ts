import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./features/postslice"
import userReducer from "./features/userslice"
const myStore = configureStore({
    reducer:{postSlice,userReducer},
})

export default myStore
export type AppStore = ReturnType<typeof myStore.getState>