import React, { useEffect } from "react";
import { useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import Search from "../../Search/Search";
import ProductItem from "../productItem/ProductItem";
import styles from "./ProductList.module.scss";
import { FILTER_BY_SEARCH, selectFilterProducts, SORT_PRODUCTS } from "../../../redux/slice/filterSlice";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filterProducts = useSelector(selectFilterProducts);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(SORT_PRODUCTS({ products, sort }));
  },[dispatch, sort, products]);
  
  
  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({ products, search }));
  },[dispatch, search, products])
  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icon}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={23} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            <b>{filterProducts.length}</b> Products found
          </p>
        </div>
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={styles.sort}>
          <label>Sort by</label>
          <select value={sort} onChange={(e)=> setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-Price">Lowest Price</option>
            <option value="highest-Price">Highest Price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.List}`}>
        {products.length === 0 ? (<p>No product found.</p>) : (
        <>
          {filterProducts.map((product)=> {
               return(
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
               )
          })}
        </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
