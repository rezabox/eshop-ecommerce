import React, { useEffect, useState } from 'react'
import { getAuth, signOut } from "firebase/auth";
import style from '../header/Header.module.scss';
import { Link,Navigate,NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import {onAuthStateChanged } from "firebase/auth";
import { FaCartPlus, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiDesktopComputer, HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';


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
  const [uName, setUName]= useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Monitor currently sign in user 
useEffect(()=>{
  const auth = getAuth();
 onAuthStateChanged(auth, (user) => {
  if (user) {
    // console.log(user);
    const uid = user.uid;
    // console.log(user.displayName);
    setUName(user.UName);
    if(user.UName == null){
      const u1 = user.email.substring(0, user.email.indexOf("@"));
      const uNames = u1.charAt(0).toUpperCase() + u1.slice(1);
      setUName(uNames);
    }
    
    dispatch(SET_ACTIVE_USER({
       email: user.email,
       useName:user.UName ? user.UName : uName,
       userID: user.uid,
    }));
    } else {
    setUName("");
    dispatch(REMOVE_ACTIVE_USER());
     }
   });
  }, [dispatch, uName]);
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
        <ul onClick={hideMenu} style={{marginRight:80}} >
          <li>
             <NavLink  to="/"  className={ ({ isActive }) => (!isActive ? `${style.active}` : "")}>Home</NavLink>
          </li>
          <li>
             <NavLink to="/contact" className={activeLink} >Contact Us</NavLink>
          </li>
        </ul>
        <div className={style["header-right"]} onClick={hideMenu}>
            <span className={style.links}>
              <ShowOnLogout><NavLink to='/login' className={activeLink} >Login</NavLink></ShowOnLogout> 
              <ShowOnLogin><a href='#home' style={{color : "#ff7722"}} className={style.logos}><FaUserCircle size={16}/> Hi,<span style={{color: "#fff"}}>{uName}</span></a></ShowOnLogin>
              <ShowOnLogin><NavLink to='/order-history' className={activeLink}>My Orders</NavLink></ShowOnLogin>
              <ShowOnLogin><NavLink to='/' onClick={logoutUser}>Logout</NavLink></ShowOnLogin>
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

