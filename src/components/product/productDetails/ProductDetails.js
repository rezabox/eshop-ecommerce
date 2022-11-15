import { useEffect, useState } from 'react';
import style from './ProductDetails.module.scss';
import { Link } from 'react-router-dom';
import spinnerImg from "../../../asset/spinner.jpg";
const ProductDetails = ()=>{
  return(
    <section>
         <div className={`container ${style.product}`}>
            <h2>Product Details</h2>  
         </div>
         {/* <div>
          <Link to="/#products">&larr; Back To Products</Link>
         </div> */}
         {/* <img src={spinnerImg} alt="Loading" style={{ width:"60px" }} /> */}
    </section>
  )
}
export default ProductDetails;