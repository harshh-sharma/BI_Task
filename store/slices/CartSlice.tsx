import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cartItemList:[]
    },
    reducers:{
        addItemToCart:(state,action) => {
           if(state.cartItemList.length > 0){
            const updatedCart = [...state.cartItemList,action.payload]
            state.cartItemList = updatedCart
           }else{
            state.cartItemList.push(action?.payload)
           }
        },
        removeItemFromCart:(state,action) => {

        },
        increaseItemQty:(state,action) => {
            const findProduct = state.cartItemList.filter(itemm => itemm?.id == action.payload);
            const removeItem = state.cartItemList.filter(itemm => itemm?.id !== action.payload);
            findProduct[0].qty = findProduct[0].qty + 1;
            const updatedCart = [...removeItem,...findProduct];
            state.cartItemList = [...updatedCart]
        },
        decreaseItemQty:(state,action) => {
            const findProduct = state.cartItemList.filter(itemm => itemm?.id == action.payload);
            const removeItem = state.cartItemList.filter(itemm => itemm?.id !== action.payload);
            if(findProduct[0].qty == 1){
               state.cartItemList = [...removeItem]
            }else{
                findProduct[0].qty = findProduct[0].qty - 1;
                const updatedCart = [...removeItem,...findProduct]
                state.cartItemList = [...updatedCart]
            }
            
        }
    }
})

export const {addItemToCart,removeItemFromCart,increaseItemQty,decreaseItemQty} = cartSlice.actions;
export default cartSlice.reducer;