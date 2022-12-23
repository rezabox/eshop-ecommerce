import styles from "./ProductDetails.module.scss";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import spinnerImg from "../../../assets/spinner.jpg";
import StarsRating from "react-star-rate";

import Product from "../Product";
import {
  ADD_ITEM_INDEX,
  CALCULATE_TOTAL_QUANTILY,
  DECREASE_ITEM,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import Card from "../../card/Card";
const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);
  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_ITEM_INDEX(product));
    dispatch(CALCULATE_TOTAL_QUANTILY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_ITEM(product));
    dispatch(CALCULATE_TOTAL_QUANTILY());
  };


  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>

                <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
                <button className="--btn --btn-danger" onClick={()=> addToCart(product)}>ADD TO CART</button>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
          {filteredReviews.length === 0 ? (
            <p>There are no reviews for this product yet.</p>
          ):(
            <>
              {filteredReviews.map((item, index)=>{
                const { rate, review, reviewDate, userName} = item;
                return (
                    <div key={index} className={styles.review}>
                      <StarsRating value={rate}/>
                        <p>{review}</p>
                        <span>
                          <b>{reviewDate}</b>
                        </span>
                        <br/>
                        <span>
                          <b>by: {userName}</b>
                        </span>
                    </div>
                )
              })}
            </>
          )}          
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
