import React, { useEffect } from "react";
import Product from "../../components/product/Product";
import Slider from "../../components/slider/Slider";

const Home = () => {
  const url = window.location.href;
  const scrollProducts = ()=>{
    if(url.includes("#products")){
      window.scrollTo({
        top:800,
        behavior:"smooth",
      });
      return;
    }
  }
  useEffect(()=>{
    scrollProducts();
  },[])
  return (
    <div>
      <Slider />
      <Product />
    </div>
  );
};

export default Home;
