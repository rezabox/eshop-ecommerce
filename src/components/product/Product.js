import React from "react";
import useFetchCollection from "../../customHooks/useFetchCollection";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import Spinner from "../../assets/spinner.jpg";
import { selectProducts, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img src={Spinner} alt="Loading..." style={{ width: "50px" }} />
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Product;
