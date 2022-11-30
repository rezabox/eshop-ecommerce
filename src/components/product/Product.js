import React from "react";
import useFetchCollection from "../../customHooks/useFetchCollection";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const Product = () => {
 const  { data, isLoading } = useFetchCollection('product');
 const product = useSelector(selectProducts);
 const dispatch = useDispatch();
 useEffect(()=>{
    dispatch(
      STORE_PRODUCTS({
        product:data,
      })
    )
 },[dispatch,data])
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          <ProductFilter />
        </aside>
        <div className={styles.content}>
          <ProductList product={product} />
        </div>
      </div>
    </section>
  );
};

export default Product;
