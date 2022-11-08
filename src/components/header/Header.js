import React, { useState } from 'react'
import { getAuth, signOut } from "firebase/auth";
import style from '../header/Header.module.scss';
import { Link,Navigate,NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { FaCartPlus, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  <Link to="/cart" >Cart<FaCartPlus size={20}/>
  <p>0</p>
  </Link>
</span>
)

const activeLink = ({ isActive }) => (isActive ? `${style.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu]= useState(false);
  const navigate = useNavigate();
  const toggleMenu = ()=>{
    setShowMenu(!showMenu);
  }
  const hideMenu = ()=>{
    setShowMenu(false)
  }
  const logoutUser = ()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
      toast.success("Logout successfully");
      navigate("/")
    }).catch((error) => {
       toast.error(error.message);
      
    });
    
  }
  return (
     <header>
      <div className={style.Header}>
       <nav className={showMenu ? `${style["show-nav"]}` : `${style["hide-nav"]}`}>
          <div className={style["logos"]}>
            {logo}
            <FaTimes className={style.btns} size={22} onClick={hideMenu}/>
          </div>
        <div className={showMenu ? `${style["nav-wrapper"]} ${style["show-nav-wrapper"]}`: `${style["nav-wrapper"]}`} onClick={hideMenu}>
        </div> 
        <ul onClick={hideMenu}>
          <li>
             <NavLink  to="/"  className={ ({ isActive }) => (!isActive ? `${style.active}` : "")}>Home</NavLink>
          </li>
          <li>
             <NavLink to="/contact" className={activeLink} >Contact Us</NavLink>
          </li>
        </ul>
        <div className={style["header-right"]} onClick={hideMenu}>
            <span className={style.links}>
              <NavLink to='/login' className={activeLink} >Login</NavLink>
              <NavLink to='/register' className={activeLink} >register</NavLink>
              <NavLink to='/order-history' className={activeLink}>My Orders</NavLink>
              <NavLink to='/' onClick={logoutUser}>Logout</NavLink>
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

