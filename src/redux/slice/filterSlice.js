import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    filterProducts:[],
};

const filterSlice = createSlice({
    name:"filter",
    initialState,
    reducers:{
      FILTER_BY_SEARCH(state,action) {
        const {products, search} = action.payload;
        const tempProducts = products.filter(
          (product)=>
            product.name.toLowerCase().includes(search.toLowerCase())||
            product.category.toLowerCase().includes(search.toLowerCase())
        );
        state.filterProducts = tempProducts;
      },
      SORT_PRODUCTS(state,action){
        const { products, sort } = action.payload;
        let tempProducts = [];
        if(sort === "latest"){
            tempProducts = products;
        }
        if(sort === "lowest-Price"){
            tempProducts = products.slice().sort((a ,b)=>{
                return a.price - b.price;
            })
        }
        if(sort === "highest-Price"){
            tempProducts = products.slice().sort((a ,b)=>{
                return b.price - a.price;
            })
        }
        if(sort === "a-z"){
            tempProducts = products.slice().sort((a ,b)=>{
                return a.name.localeCompare(b.name);
            })    
        }
        if(sort === "z-a"){
            tempProducts = products.slice().sort((a ,b)=>{
                return b.name.localeCompare(a.name);
            })
        }
        state.filterProducts = tempProducts;
      }
    },
});
export const { FILTER_BY_SEARCH , SORT_PRODUCTS} = filterSlice.actions;
export const selectFilterProducts = (state)=> state.filter.filterProducts
export default filterSlice.reducer;
