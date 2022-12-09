import React, { useState } from "react";
import useFetchCollection from "../../customHooks/useFetchCollection";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import Spinner from "../../assets/spinner.jpg";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FaCogs } from "react-icons/fa";
const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const [showFilter, setShowFilter] = useState(false);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);
  useEffect(() => {
    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img src={Spinner} alt="Loading..." style={{ width: "50px" }} />
          ) : (
            <ProductList products={products} />
          )}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={22} color="oranged"/>
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Product;
