import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect  } from 'react-router-dom';

import CarSlider from './CarSlider';

import '../style/show_car.scss';

const axios = require('axios').default;

const ShowNewcar = ({ id }) => {
    
    const dispatch = useDispatch();

    const { searchResult } = useSelector(store => store.search);
    const { user } = useSelector(store => store.user);
    //const owner = car.userId;
    
    if(!user.isAdmin && !id) return <Redirect to='/' />;

    const car = searchResult.find(car => car._id === id);
    
    if(!car) return <Redirect to='/user' />;
    
    const OpenImages = ()=>{
        if(!!car.images && car.images.length > 0)
            dispatch({
                type: "OPEN_FULLSCREEN",
                payload: [...car.images]
                        .map(img => `http://localhost:3001/tempCarsImages/${img}`)
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
                            <CarSlider 
                                images={
                                    [...car.images]
                                    .map(img => `http://localhost:3001/tempCarsImages/${img}`)
                                }
                                exact
                            />
                }
                </div>
                <div className='show_car_info'>
                    <div className='show_car_characteristics'>
                        <h3>Characteristic</h3>
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
            </div>
        </div>
    )
}

export default ShowNewcar;
/*
<div className='show_car_contact'>
                        <h3>Contacts</h3>
                        <div>
                            <p>Name: {owner.name}</p>
                            <p>Email: {owner.email}</p>
                            <p>Phone: {owner.phone}</p>
                            {
                                owner.additionalPhone ?
                                    <p>Phone: {owner.additionalPhone}</p> : ''
                            }
                        </div>
                    </div>
                    */
