import React, {  Component } from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/slider.scss';

export default class SimpleSlider extends Component {
  render() {
    const settings = {
     //dots: true,
      infinite: true,
      speed: 10000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      autoplaySpeed: 10000,
      pauseOnDotsHover: true,
      adaptiveHeight: true,
    };
    return (
        <Slider {...settings}>
          <div className='slidet_image_wrap'>
            <img src='https://www.next-brands.com/wp-content/uploads/2013/12/Shelby-Cobra-2.jpg' alt="alt"/>
          </div>
          <div className='slidet_image_wrap'>
            <img src='https://images.drive.ru/i/0/5a818df2ec05c44303000046.jpg' alt="alt"/>
          </div>
          <div className='slidet_image_wrap'>
            <img src='https://motor.ru/imgs/2020/05/23/20/3923466/7c6042eb07e46d653ccca2cae07652ba28357fab.jpg' alt="alt"/>
          </div>
          <div className='slidet_image_wrap'>
            <img src='https://25cars.ru/wp-content/uploads/2019/05/0-1.jpg' alt="alt"/>
          </div>
          <div className='slidet_image_wrap'>
            <img src='https://bibilife.ru/sites/default/files/imagecache/group-poster/user/1/brands/posters/Plymouth.jpg' alt="alt"/>
          </div>
          <div className='slidet_image_wrap'>
            <img src='https://avto-russia.ru/autos/plymouth/photo/plymouth_prowler_1280x1024.jpg' alt="alt"/>
          </div>
          <div className='slidet_image_wrap'>
            <img src='https://wallpaperstock.net/shelby-mustang-gt500-in-black_wallpapers_17375_1024x768.jpg' alt="alt"/>
          </div>
        </Slider>
    );
  }
}