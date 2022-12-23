import React from "react";
import Card from "../../card/Card";
import { Link } from "react-router-dom";
import style from "./ProductItem.module.scss";
import { useDispatch } from "react-redux";
import {
  ADD_ITEM_INDEX,
  CALCULATE_TOTAL_QUANTILY,
} from "../../../redux/slice/cartSlice";


const ProductItem = ({ product, id, grid, name, price, desc, imageURL }) => {
  const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const addToCart = (product)=>{
    dispatch(ADD_ITEM_INDEX(product));
    dispatch(CALCULATE_TOTAL_QUANTILY(product));
  }
  return (
    <Card cardClass={grid ? `${style.grid}` : `${style.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={style.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={style.content}>
        <div className={style.details}>
          <p>{`$${price}`}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>
        {!grid && <p className={style.desc}>{shortenText(desc, 200)}</p>}
        <button className="--btn --btn-danger" onClick={()=> addToCart(product)}>Add To Cart</button>
      </div>
    </Card>
  );
};

export default ProductItem;
