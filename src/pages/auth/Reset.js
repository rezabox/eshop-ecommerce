import styles from "../auth/auth.module.scss";
import forgotImg from "../../asset/forgot.png";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { useState } from "react";
import Loader from "../../components/loader/Loader";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reset = () => { 
  const[email,setEmail] = useState("");
  const[isLoader,setIsLoader]= useState(false);
  const resetPassword = (e)=>{
    e.preventDefault();
    setIsLoader(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
         setIsLoader(false);
         toast.success("check your email to reset password..");
      })
      .catch((error) => {
         setIsLoader(false);
         toast.error(error.message);
      });
  }
  return (
    <>
      {isLoader && <Loader/>}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={forgotImg} alt="Reset Password" width="500" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>

            <form onSubmit={resetPassword}>
              <input
                type='text'
                placeholder="Email"
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Reset
              </button>
            </form>
            <span className={styles.reset}>
              <Link to="/register">Register-</Link>
              <Link to="/login">Login-</Link>
            </span>
          </div>
          </Card>
      </section>
      
    </>
  );
};

export default Reset;
