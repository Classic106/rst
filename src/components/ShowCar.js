import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import CarSlider from './CarSlider';

import '../style/show_car.scss';

const axios = require('axios').default;

const Showcar = ({ id }) => {
    
    const dispatch = useDispatch();

    const { searchResult } = useSelector(store => store.search);
    const car = searchResult.find(car => car._id === id);
    const owner = car.userId || {};

    const OpenImages = ()=>{
        if(!!car.images && car.images.length > 0)
            dispatch({
                type: "OPEN_FULLSCREEN",
                payload: {
                    images: car.images
                }
            })
    }
    
    return(
        <div className='show_car'>
            <h3>{car.manufacturer.toUpperCase()} {car.model.toUpperCase()}</h3>
            <div className='show_car_item'>
                <div className='wrap_car_img' onClick={OpenImages}>
                {   
                    (!car.images || car.images.length === 0) ?
                        <img src='https://i.rst.ua/no-photo.png' alt='carImage'/> :
                            <CarSlider images={car.images} exact/>
                }
            </div>
            <div className='show_car_info'>
                <div className='show_car_characteristics'>
                    <h3>Characterictic</h3>
                    <div>
                        <div className='show_car_characteristic'>
                            <p>Price: {car.price} $</p>
                            <p>Year: {car.year}, ({car.mileage}-mileage)</p>
                            <p>Engine: {car.engine} {car.fuel}</p>    
                            <p>Transmission: {car.transmission} ({car.drive})</p>
                        </div>
                        <div className='show_car_characteristic'>
                            <p>Color: {car.color}</p>
                            <p>City: {car.city}</p>
                            <p>Condition: {car.condition}</p>            
                        </div>
                    </div>
                </div>
                
                </div>
                    {
                    car.description ? 
                        <div className='show_car_description'>
                            <h3>Description</h3>
                            <p>{car.description}</p>
                        </div> : ''
                }
                <div className='show_car_contact'>
                <h3>Contacts</h3>
                <div>
                    {
                        owner.name ? <p>Name: {owner.name}</p> : ''
                    }
                    <p>Email: {owner.email}</p>
                    {
                        owner.phone ? <p>Phone: {owner.phone}</p> : ''
                    }
                    {
                        owner.additionalPhone ?
                            <p>Phone: {owner.additionalPhone}</p> : ''
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default Showcar;
