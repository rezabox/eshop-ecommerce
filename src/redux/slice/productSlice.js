import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products : [],
};
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      STORE_PRODUCTS: (state, action) => {
        state.products = action.payload.products;
    },
  },
});
export const { STORE_PRODUCTS } = productSlice.actions;
export const selectProduct = (state)=> state.product.products;
export default productSlice.reducer;