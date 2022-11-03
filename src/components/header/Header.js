import React, { useState } from 'react'
import style from '../header/Header.module.scss';
import { Link,NavLink } from "react-router-dom";
import { FaCartPlus, FaTimes } from "react-icons/fa";
import { HiDesktopComputer, HiOutlineMenuAlt3 } from "react-icons/hi";
const logo = (
  <div className={style.logo}>
  <Link to="/">
    <h2 className='p-4'>e<span>Shop</span>.</h2>
  </Link>
</div>
)

const cart = (
  <span className={style.cart}>
  <NavLink to="/cart" className={activeLink} activeClassName="activated">Cart<FaCartPlus size={20}/>
  <p>0</p>
  </NavLink>
</span>
)
const activeLink = ({isActive}) => (isActive ? `${style.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu]= useState(false);
  const toggleMenu = ()=>{
    setShowMenu(!showMenu);
  }
  const hideMenu = ()=>{
    setShowMenu(false)
  }
  return (
     <header>
      <div className={style.Header}>
       <nav className={showMenu ? `${style["show-nav"]}` : `${style["hide-nav"]}`}>
            {logo}
        <div className={showMenu ? `${style["nav-wrapper"]} ${style["show-nav-wrapper"]}`: `${style["nav-wrapper"]}`} onClick={hideMenu}>
        </div> 
        <ul onClick={hideMenu}>
          <li>
             <NavLink  to='/' className={activeLink} activeClassName="activated">Home</NavLink>
          </li>
          <li>
             <NavLink to="/contact" className={activeLink} activeClassName="activated">Contact Us</NavLink>
          </li>
        </ul>
        <div className={style["header-right"]} onClick={hideMenu}>
            <span className={style.links}>
              <NavLink to='/login' className={activeLink} activeClassName="activated">Login</NavLink>
              <NavLink to='/register' className={activeLink} activeClassName="activated">register</NavLink>
              <NavLink to='/order-history' className={activeLink} activeClassName="activated">My Orders</NavLink>
            </span>
             {cart}
          </div>
                     
       </nav>
       <div className={style["menu-icon"]}>
         {logo}
         {cart}
         <HiOutlineMenuAlt3 size={30} onClick={toggleMenu}/>
       </div>
      </div>
     </header>
  )
}

export default Header

