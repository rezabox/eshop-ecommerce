import { orderBy } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectUserID } from "../../redux/slice/authSlice";
import {
  selectOrderAmount,
  selectOrderHistory,
  STORE_ORDERS,
} from "../../redux/slice/orderSlice";
import styles from "./orderHistory.module.scss";
const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const userId = useSelector(selectUserID);
  const orders = useSelector(selectOrderHistory);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterOrders = orders.filter((order) => order.userId === userId);
  useEffect(()=>{
    dispatch(STORE_ORDERS(data))
  },[dispatch,data])
  const handleClick = (id)=>{
    navigate(`/order-details/${id}`);
  }
  return (
    <section>
      <div className="order">
        <h2>Your Order History</h2>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {filterOrders.length === 1 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order Id</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filterOrders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={id} onClick={()=> handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} && {orderTime}
                        </td>
                        <td>
                          {"$"} {orderAmount}
                        </td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default OrderHistory;
