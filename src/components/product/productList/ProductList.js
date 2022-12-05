import React from "react";
import { useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../Search/Search";
import ProductItem from "../productItem/ProductItem";
import styles from "./ProductList.module.scss";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
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
            <b>4</b> Products found
          </p>
        </div>
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={styles.sort}>
          <label>Sort by</label>
          <select>
            <option value="Latest">Latest</option>
            <option value="Lowest Price">Lowest Price</option>
            <option value="Highest Price">Highest Price</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.List}`}>
        {products.length === 0 ? (<p>No product found.</p>) : (
        <>
          {products.map((product)=> {
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
