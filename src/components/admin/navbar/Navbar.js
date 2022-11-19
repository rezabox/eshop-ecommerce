import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.scss"
const activeLink = ({isActive})=> (isActive ? `${style.active}` : "");

const Navbar = () => {
  return (
    <div className={style.navbar}>
        <div className={style.user}>
           <FaUserCircle size={40}/>
           <h4>Reza Asareh</h4>
        </div>
        <nav>
          <ul>
            <li className={style.border}>
              <NavLink to="/admin/home" className={activeLink} >Home</NavLink>
            </li>
            <li className={style.border}>
              <NavLink to="/admin/all-products"  className={activeLink} >All Products</NavLink>
            </li>
            <li className={style.border}>
              <NavLink to="/admin/add-product"  className={activeLink} >Add Products</NavLink>
            </li>
            <li className={style.border}>
              <NavLink to="/admin/orders"  className={activeLink} >Orders</NavLink>
            </li>
          </ul>
        </nav>
    </div>
  );
};

export default Navbar;
