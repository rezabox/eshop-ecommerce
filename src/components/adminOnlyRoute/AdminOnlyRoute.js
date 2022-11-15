import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
function AdminOnlyRoute({children}) {
  const userEmail = useSelector(selectEmail);
  if(userEmail === "reza.asareh81@gmail.com"){
    return children
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied</h2>
        <p>This Page can only be view by admin user.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back To home</button>
        </Link>
      </div>
    </section>
  );
}
export const AdminOnlyEmail = ({children})=>{
     const userEmail = useSelector(selectEmail);
     if(userEmail === "reza.asareh81@gmail.com"){
        return children;
     }  
     return null;
};
export default AdminOnlyRoute;
