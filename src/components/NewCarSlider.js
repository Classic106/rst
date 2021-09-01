import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/new_slider.scss';

const axios = require('axios').default;

const NewCarSlider = ({ car, exact })=>{

  const dispatch = useDispatch();
  
  const [imgs, setImgs] = useState(car.images || []);
  const [user, setUser] = useState(false);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(()=>{
    return(()=>{

      if(exact){

      }else{
        if(user) dispatch({type: 'SET_USER', payload: user});
      }
    })
  }, [dispatch])

  const DeleteImage = e =>{

    e.stopPropagation();

    const index = e.target.attributes[1].value;
    
    let images = [...car.images];
    const deletedImg = images.splice(+index, 1)[0];
    
    if(exact){
      axios.post('http://localhost:3001/cars/deletePicTemp/'+car._id, {images, deletedImg})
        .then(result => {
          setImgs(imgs.splice(index, 1));
          //dispatch({type: 'SET_SEARCH_RESULT', payload: result.data});
          alert('Image deleted!!!');
        })
        .catch(err => {
          //console.log(err.message);
        });
    }else{
      axios.post('http://localhost:3001/cars/deletePic/'+car._id, {images, deletedImg})
        .then(user => {
          setImgs(imgs.splice(index, 1));
          setUser(user.data);
          alert('Image deleted!!!');
        })
        .catch(err => {
          //console.log(err.message);
        });
    }
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

export default NewCarSlider;
