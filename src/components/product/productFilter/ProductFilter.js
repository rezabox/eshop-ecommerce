import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import {
  selectProducts,
} from "../../../redux/slice/productSlice";
import styles from "./ProductFilter.module.scss";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((products) => products.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(products.map((products) => products.brand)),
  ];

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);
  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);
  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const ClearUp = () => {
    setCategory("All");
    setBrand("All");
    setPrice(3000);
  };
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return(
            <button
            key={index}
            type="button"
            onClick={() => filterProducts(cat)}
            className={`${category}` === cat ? `${styles.active}` : null}
          >
            &#8250;{cat}
          </button>
            ) 
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>
      <h4>Price</h4>
      <p>{`$${price}`}</p>
      <div className={styles.price}>
        <input
          type="range"
          value={price}
          min="0"
          max="3000"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button className="--btn --btn-danger" onClick={ClearUp}>
        Clear Filter
      </button>
    </div>
  );
};

export default ProductFilter;