import styles from "../auth/auth.module.scss";
import loginImg from "../../asset/login.png";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import icon1 from '../../asset/eye-fill.svg';
import icon2 from '../../asset/eye-slash-fill.svg';
import { auth } from "../../firebase/config";
import { useState } from "react";
import Card from "../../components/card/Card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../components/loader/Loader";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const Login = () => { 
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[isLoader,setIsLoader] = useState(false);
  const[change,setChange] = useState('password');
  const[icon,setIcon] = useState(icon2);
  const navigate = useNavigate();
  const handleClick = ()=>{
      if(change === 'password'){
        setChange('text');
        setIcon(icon1);
      }else{
        setChange('password');
        setIcon(icon2);
      }
  }
  const loginUser = (e)=>{
    e.preventDefault();
    setIsLoader(true);
    
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setIsLoader(false);
        toast.success("Welcome to account");
        navigate("/");
      })
      .catch((error) => {
        setIsLoader(false);
        toast.error(error.message)
      });
  }
  // login with Google

const provider = new GoogleAuthProvider();
  const signInGoogle = (e)=>{
     e.preventDefault();
     const auth = getAuth();
     signInWithPopup(auth, provider)
       .then((result) => {
        //  const user = result.user;
         toast.success("Login Successfully");
         navigate("/");
       }).catch((error) => {
         toast.error(error.message);
       });
  }
  return (
    <>
    <ToastContainer style={{ fontSize: "15px" }} />
    {isLoader && <Loader/>}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="500" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type='text'
                placeholder="Email"
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
              <input
                type={change}
                placeholder="Password"
                required
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
              <span onClick={handleClick}><img src={icon} alt="" width={22} /></span>
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
               onClick={signInGoogle}   >
              <FaGoogle color="#fff" /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
          </Card>
      </section>
      
    </>
  );
};

export default Login;
