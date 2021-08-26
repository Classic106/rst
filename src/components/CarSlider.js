import React, {  Component } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/slider.scss';

/*const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className='slider_btn prev'
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >{'<'}</button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className='slider_btn next'
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  >{'>'}</button>
)*/

const SimpleSlider = ({ images, exact })=> {
  
    const settings = exact ? {
      //dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      autoplaySpeed: 3000,
      pauseOnDotsHover: true,
      fade: true,
      initialSlide: 0,
      cssEase: 'linear'
      //adaptiveHeight: true,
    } : {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      //initialSlide: this.initSlide,
      //adaptiveHeight: true,
      /*prevArrow: <SlickArrowLeft />,
      nextArrow: <SlickArrowRight />,*/
    };
    
    return (
        <Slider {...settings}>
        {
          images.map((img, index) => {
            return <div
              className='slider_image_wrap'
              key={img}
            >
              <img src={img}  alt="alt"/>
            </div>
            })
        }
        </Slider>
    );
}

export default SimpleSlider;