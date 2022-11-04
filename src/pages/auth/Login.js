import styles from "../auth/auth.module.scss";
import loginImg from "../../asset/login.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import icon1 from '../../asset/eye-fill.svg';
import icon2 from '../../asset/eye-slash-fill.svg';

import { useState } from "react";
import Card from "../../components/card/Card";



const Login = () => { 
  const[change,setChange] = useState('password');
  const[icon,setIcon] = useState(icon2);
  const handleClick = ()=>{
      if(change === 'password'){
        setChange('text');
        setIcon(icon1);
      }else{
        setChange('password');
        setIcon(icon2);
      }
  }
  return (
    <>
    
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="500" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form>
              <input
                type='text'
                placeholder="Email"
                required
              />
              <input
                type={change}
                placeholder="Password"
                required
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
            >
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
