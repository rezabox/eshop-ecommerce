import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_ITEM_INDEX(state, action) {
      const productItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productItem >= 0) {
        state.cartItems[productItem] += 1;
        toast.info(`${action.payload.name} increces by one`, {
          position: "top-left",
        });
      } else {
        //add product in cart
        const tempProducts = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProducts);
        toast.success(`${action.payload.name} add item to cart`, {
          position: "top-right",
        });
      }
      //save item in web
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_ITEM(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.success(`${action.payload.name} remove item`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} decreased by one`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newCartItem;
      toast.success(`${action.payload.name} removed from cart`, {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.info("Cart is empty", {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CACULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      });
      state.cartTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_QUANTILY(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      });
      state.cartTotalQuantity = totalQuantity;
    },
    SAVE_URL(state, action) {
      state.previousURL = action.payload;
    },
  },
});
export const {
  SAVE_URL,
  CACULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTILY,
  CLEAR_CART,
  REMOVE_FROM_CART,
  ADD_ITEM_INDEX,
  DECREASE_ITEM,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;

