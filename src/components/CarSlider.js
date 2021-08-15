import React, {  Component } from 'react';
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

export default class SimpleSlider extends Component {
  
  constructor(props){
    super(props);
    this.images = props.images;
    this.exact = props.exact;
    //this.images = ['dsfsfs','sdfsfsf'];
  }
  render() {
    const settings = this.exact ? {
      //dots: true,
      infinite: true,
      speed: 10000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      autoplaySpeed: 10000,
      pauseOnDotsHover: true,
      fade: true,
      cssEase: 'linear'
      //adaptiveHeight: true,
    } : {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      //adaptiveHeight: true,
      /*prevArrow: <SlickArrowLeft />,
      nextArrow: <SlickArrowRight />,*/
    };

    if(!this.images || this.images.length === 0)
      return <img src='https://i.rst.ua/no-photo.png' alt='carImage'/>;
    
    return (
        <Slider {...settings}>
        {
          this.images.map(img => 
            <div className='slider_image_wrap' key={img}>
              <img src={img} alt="alt"/>
            </div>)
        }
        </Slider>
    );
  }
}