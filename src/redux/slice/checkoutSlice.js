import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shoppingAddress: {},
    billingAddress: {},
};

const checkoutSlice = createSlice({
    name:"checkout",
    initialState,
    reducers:{
        SAVE_SHOPPING_ADDRESS(state, action){
            state.shoppingAddress = action.payload;
        },
        SAVE_BILLING_ADDRESS(state, action){
           state.billingAddress = action.payload;
        }
    }
})

export const { SAVE_BILLING_ADDRESS, SAVE_SHOPPING_ADDRESS } = checkoutSlice.actions;
export const selectShoppingAddress = (state)=> state.checkout.shoppingAddress;
export const selectBillingAddress = (state)=> state.checkout.billingAddress;

export default checkoutSlice.reducer;