import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { FaTrashAlt } from "react-icons/fa";
import {
  ADD_ITEM_INDEX,
  CACULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTILY,
  CLEAR_CART,
  DECREASE_ITEM,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import styles from "./Cart.module.scss";
import Card from "../../components/card/Card";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const decreaseCart = (cart) => {
    dispatch(DECREASE_ITEM(cart));
  };
  const increaseCart = (cart) => {
    dispatch(ADD_ITEM_INDEX(cart));
  };
  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };
  const clearCart = ()=>{
    dispatch(CLEAR_CART());
  }
  useEffect(() => {
    dispatch(CACULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTILY());
    dispatch(SAVE_URL(url));
  },[cartItems, dispatch]);
  
  
  const url = window.location.href;
  const checkout = ()=>{
       if(isLoggedIn){
         navigate('/');
       }else{
        dispatch(SAVE_URL(url));
        navigate('/login');
       }
  }

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>your cart is currently empty.</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue Shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              {cartItems.map((cart, index) => {
                const { id, name, price, imageURL, cartQuantity } = cart;
                return (
                  <tbody key={id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>Clear Cart</button>
              <div className={styles.checkout}>
                <Link to="/#products">&larr; Continue shopping</Link>
              </div>
              <br />
              <Card cardClass={styles.card}>
                <p>
                  <b>{`Cart Item(s): ${cartTotalQuantity}`}</b>
                </p>
                <div className={styles.text}>
                  <h4>Subtotal:</h4>
                  <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                </div>
                <p>Tax an shopping calculate at checkout</p>
                <button className="--btn --btn-primary --btn-block" onClick={checkout} >Checkout</button>
              </Card>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
