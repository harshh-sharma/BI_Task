import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cartItemList:[]
    },
    reducers:{
        addItemToCart:(state,action) => {
           
        },
        removeItemFromCart:(state,action) => {

        }
    }
})

export const {addItemToCart,removeItemFromCart} = cartSlice.actions;
export default cartSlice.reducer;