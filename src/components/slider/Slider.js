import { SliderData } from "./Slider-data";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import "./Slider.scss";

function Slider() {
  const [currentSlider, setCurrentSlider] = useState(0);
  const slideLenght = SliderData.length;
  const autoSlide = true;
  let IntervalTime = 6000;
  let slideInterval;

  const nextSlide = () => {
    setCurrentSlider(currentSlider === slideLenght - 1 ? 0 : currentSlider + 1);
    console.log(currentSlider);
  };
  const prevSlide = () => {
    setCurrentSlider(currentSlider === 0 ? slideLenght - 1 : currentSlider - 1);
  };
  useEffect(()=>{
     setCurrentSlider(0);
  },[])
  useEffect(()=>{
    if(autoSlide){
      const auto = ()=>{
         slideInterval = setInterval(nextSlide,IntervalTime);
      }
      auto();
    }
    return ()=> clearInterval(slideInterval);
  },[currentSlider,autoSlide,slideInterval])  
  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlider ? "slide current" : "slide"}
          >
            <img src={image} alt="slide" />
            <div className="content">
              <h1>{heading}</h1>
              <p>{desc}</p>
            <hr/>
            <a href="#product" className="--btn --btn-primary">
              Shop Now
            </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Slider;
