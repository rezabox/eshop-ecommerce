import styles from "../auth/auth.module.scss";
import registerImg from "../../asset/register.png";
import Loader from "../../components/loader/Loader";
import icon1 from '../../asset/eye-fill.svg';
import icon2 from '../../asset/eye-slash-fill.svg';

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../../components/card/Card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

const Register = () => { 
 const[email,setEmail] = useState("");
 const[password,setPassword] = useState("");
 const[cPassword,setCPassword] = useState(""); 
 const[change,setChange]  = useState('password');
 const[icon,setIcon] = useState(icon2);
 const[isLoader,setIsLoader]= useState(false);
 const navigate = useNavigate();
 const handleClick = ()=>{
  if(change === 'password'){
    setChange('text');
    setIcon(icon1);
  }else{
    setChange('password');
    setIcon(icon2)
  }
 }
 const registerUser = (e)=>{
  e.preventDefault();
  if(password !== cPassword){
    toast.error("Passwords do not match.");
  }
  setIsLoader(true);
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setIsLoader(false);
      toast.success("Registration Successful...");
      navigate("/login");
    })
    .catch((error) => {
      toast.error(error.message);
      setIsLoader(false);
    });
 }
  return (
    <> 
    <ToastContainer style={{ fontSize: "15px" }}
    position="top-right"
    autoClose={6000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
     />
     {isLoader && <Loader/>}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type='text'
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
              <input
                type={change}
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
              <span onClick={handleClick}><img src={icon} alt="" width={22} /></span>
              <input
                type={change}
                placeholder="Confirm Password"
                required
                onChange={(e)=> setCPassword(e.target.value)}
              />
              <span onClick={handleClick}><img src={icon} alt="" width={22} /></span>
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button> 
              <span className={styles.register}>
              <p>Already an account?</p>
              <Link to="/login">Login</Link>
            </span> 
            </form>
          </div>
          </Card>
          <div className={styles.img}>
          <img src={registerImg} alt="regeiter" width="600" />
        </div>
      </section>
      
    </>
  );
};

export default Register;
