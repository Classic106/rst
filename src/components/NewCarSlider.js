import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/new_slider.scss';

const axios = require('axios').default;

const SimpleSlider = ({ car })=>{

  const dispatch = useDispatch();
  const [imgs, setImgs] = useState(car.images);
  
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const DeleteImage = e =>{

    e.stopPropagation();

    const index = e.target.attributes[1].value;

    let images = [...car.images];
    const deletedImg = images.splice(+index, 1)[0];
    
    axios.post('http://localhost:3001/cars/deletePicTemp/'+car._id, {images, deletedImg})
      .then(result => {
        imgs.splice(index, 1);
        dispatch({type: 'SET_SEARCH_ITEMS', payload: result.data})
      })
      .catch(err => {
        //console.log(err.message);
      });
  }

  const FullSize = e =>{
    //console.log(e.target.attributes[1].value)
    dispatch({ type: "OPEN_FULLSCREEN",
        payload: {
          images: imgs,
          initSlide: e.target.attributes[1].value
        }
    })
  }
  
  if(imgs.length === 1 || imgs.length === 0)
    return ( <div className='slider_image_wrap'>
            {
                imgs.length === 0 ? '' :      
                  <div className='slider_image_buttons'>
                    <button
                          className='button'
                          onClick={FullSize}
                          index={0}
                        >
                          Full size
                        </button>
                    
                    <button
                      className='button delete'
                      onClick={DeleteImage}
                      index={0}
                    >
                      Delete
                    </button>
                  </div>
            }
            <img
              src={imgs.length === 0 ? 'https://i.rst.ua/no-photo.png' : imgs[0]}
              alt="alt"
            />
          </div>)
  
  return (
      <Slider {...settings}>
      {
        imgs.map((img, index) => 
          <div className='slider_image_wrap' key={img}>
            <div className='slider_image_buttons'>
              <button
                className='button'
                onClick={FullSize}
                index={index}
              >
                Full size
              </button>
              <button
                className='button delete'
                onClick={DeleteImage}
                index={index}
              >
                Delete
              </button>
            </div>
            <img src={img} alt="alt"/>
          </div>)
      }
      </Slider>
  );
}

export default SimpleSlider;
