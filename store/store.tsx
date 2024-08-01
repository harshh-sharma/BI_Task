import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/CartSlice";

const appStore = configureStore({
    reducer:{
        cart:cartSlice
    }
})

export default appStore;