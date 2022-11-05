import styles from "../auth/auth.module.scss";
import forgotImg from "../../asset/forgot.png";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";



const Reset = () => { 

  return (
    <>
     
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={forgotImg} alt="Login" width="500" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>
            <form>
              <input
                type='text'
                placeholder="Email"
                required
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
