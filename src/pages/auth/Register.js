import styles from "../auth/auth.module.scss";
import registerImg from "../../asset/register.png";

import icon1 from '../../asset/eye-fill.svg';
import icon2 from '../../asset/eye-slash-fill.svg';

import { Link } from "react-router-dom";
import { useState } from "react";
import Card from "../../components/card/Card";


const Register = () => { 
 const[change,setChange]  = useState('password');
 const[icon,setIcon] = useState(icon2);
 const handleClick = ()=>{
  if(change === 'password'){
    setChange('text');
    setIcon(icon1);
  }else{
    setChange('password');
    setIcon(icon2)
  }
 }
  return (
    <>  
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form>
              <input
                type='text'
                placeholder="Enter Email"
                required
              />
              <input
                type={change}
                placeholder="Enter Password"
                required
              />
              <span onClick={handleClick}><img src={icon} alt="" width={22} /></span>
              <input
                type={change}
                placeholder="Confirm Password"
                required
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
