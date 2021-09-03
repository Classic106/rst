import React, { useState } from "react";
import { useDispatch } from "react-redux";

import NewCarSlider from './NewCarSlider';

import '../style/car_item.scss';
import '../style/new_car_description.scss';
import '../style/new_slider.scss';

const axios = require('axios').default;

const EditCarItem = ({ car })=>{

    const dispatch = useDispatch();
    
    const [disabled, setDisabled] = useState(true);
    
    const [manufacturer, setManufacturer] = useState(car.manufacturer);
    const [model, setModel] = useState(car.model);
    const [price, setPrice] = useState(car.price);
    const [year, setYear] = useState(car.year);
    const [mileage, setMileage] = useState(car.mileage);
    const [engine, setEngine] = useState(car.engine);
    const [fuel, setFuel] = useState(car.fuel);
    const [transmission, setTransmission] = useState(car.transmission);
    const [condition, setCondition] = useState(car.condition);
    const [drive, setDrive] = useState(car.drive);
    const [city, setCity] = useState(car.city);
    const [exchange, setExchange] = useState(car.exchange);
    const [description, setDescription] = useState(car.description);

    const Edit = ()=> setDisabled(!disabled);

    const Submit = e =>{
        e.preventDefault();

        let obj = {};

        if(manufacturer !== car.manufacturer) obj.manufacturer = manufacturer;
        if(model !== car.model) obj.model = model;
        if(+mileage !== +car.mileage) obj.mileage = mileage;
        if(+price !== +car.price) obj.price = +price;
        if(+year !== +car.year) obj.year = +year;
        if(+engine !== +car.engine) obj.engine = +engine;
        if(exchange !== car.exchange) obj.exchange = exchange;
        if(fuel !== car.fuel) obj.fuel = fuel;
        if(transmission !== car.transmission) obj.transmission = transmission;
        if(condition !== car.condition) obj.condition = condition;
        if(drive !== car.drive) obj.drive = drive;
        if(city !== car.city) obj.city = city;
        if(description !== car.description) obj.description = description;

        if(Object.keys(obj).length > 0){
            axios.patch('http://localhost:3001/cars/'+car._id, obj)
                .then(result => {
                    alert('Model changed!!!');
                    //console.log(result.data)
                    dispatch({type: 'SET_USER', payload: result.data});
                })
                .catch(err => {
                    //console.log(err.message);
                });
        }else alert('Nothing change!!!');
    }

    const Delete = () =>{

        axios.delete('http://localhost:3001/cars/'+car._id)
            .then(result => {
                alert('Model deleted!!!');
                dispatch({type: 'SET_USER', payload: result.data});
            })
            .catch(err => {
                //console.log(err.message);
            });
    }
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
            <div className='car_item' key={car._id}>
            <div className='wrap_car_img'>
                <div className='slidet_image_wrap' onClick={OpenImages}>
                    <NewCarSlider car={car}/>
                </div>
            </div>
            <form className='car_description' onSubmit={Submit}>
                <div>
                <h3>
                    Manufacturer:
                    <input
                        value={manufacturer.toUpperCase()}
                        disabled={disabled}
                        onChange={e => setManufacturer(e.target.value)}
                        type='text' name='manufacturer'
                        required pattern='[a-zA-Z]{0,20}'
                    />
                </h3>
                <h3>
                    Model:
                    <input
                        value={model.toUpperCase()}
                        disabled={disabled}
                        onChange={e => setModel(e.target.value)}
                        name='model' type='text'
                        required pattern='[a-zA-Z0-9]{0,20}'
                    />
                </h3>
                </div>
                <div className='car_description_items'>
                    <section className='car_item_left'>
                        <label>
                            Price
                            <input
                                value={price} 
                                disabled={disabled}  
                                onChange={e => setPrice(e.target.value)}
                                name='price' type='text'
                                pattern='[0-9]{0,10}' required
                            />
                        </label>
                        <label>
                            Year
                            <input
                                value={year} disabled={disabled} 
                                onChange={e => setYear(e.target.value)}
                                name='year' type='text'
                                pattern='[0-9]{4}' required
                            />
                        </label>
                        <label>
                            Mileage
                            <input
                                value={mileage} disabled={disabled} 
                                onChange={e => setMileage(e.target.value)}
                                name='mileage' type='text'
                                required pattern='^[0-9]{0,7}$'
                            />
                        </label>
                        <label>
                            Engine
                            <input
                                value={engine} disabled={disabled} 
                                onChange={e => setEngine(e.target.value)}
                                name='engine' type='text'
                                required pattern='^\d{0,1}\.?\d{0,3}$'
                            />
                        </label>
                        <label>
                            Exchange
                            <input type="checkbox" name='exchange'
                                checked={exchange} disabled={disabled}
                                onChange={e => setExchange(e.target.checked)}
                            />
                        </label>
                    </section>
                    <section className='car_item_right'>
                        <label>
                            Fuel
                            {
                                disabled ? <span>{fuel}</span>: 
                            <select
                                name="fuel" value={fuel} 
                                onChange={e => setFuel(e.target.value)}
                                required type='text'
                            >
                                <option value="">----</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Petrol/Gas">Petrol/Gas</option>
                                <option value="Electro">Electro</option>
                                <option value="Gibride">Gibride</option>
                            </select>
                            }
                        </label>
                        <label>
                            Transmission
                            {   disabled ? <span>{transmission}</span> :
                                <select
                                    name="transmission" value={transmission}
                                    onChange={e => setTransmission(e.target.value)}
                                    required
                                >
                                    <option value="">----</option>
                                    <option value="Automat">Automat</option>
                                    <option value="Mechanic">Mechanic</option>
                                </select>
                            }
                            </label>
                        <label>
                            Condition
                            {
                                disabled ? <span>{condition}</span> :
                                <select
                                    name="condition" value={condition} required
                                    onChange={e => setCondition(e.target.value)}
                                >
                                    <option value="">----</option>
                                    <option value="New">New</option>
                                    <option value="No investment required">No investment required</option>
                                    <option value="Good condition">Good condition</option>
                                    <option value="Needs repair">Needs repair</option>
                                    <option value="After an accident">After an accident</option>
                                    <option value="For parts">For parts</option>
                                    <option value="Problematic documents">Problematic documents</option>
                                </select> 
                            }
                        </label>
                        <label>
                            Drive
                            {
                                disabled ? <span>{drive}</span> :
                                    <select
                                        name="drive" value={drive} required
                                        onChange={e => setDrive(e.target.value)}
                                        
                                    >
                                        <option value="">----</option>
                                        <option value="Front wheel">Front wheel</option>
                                        <option value="Rear wheel">Rear wheel</option>
                                        <option value="Full drive">Full drive</option>
                                    </select>
                            }
                        </label>
                        <label>
                            City:
                            <input 
                                value={city} disabled={disabled} type='text'
                                onChange={e => setCity(e.target.value)}
                                name='city' required
                            />
                        </label>
                    </section>
                </div>
                <label className='car_descr'>
                    Description
                    <textarea
                        type='text' name='description'
                        pattern='^[a-zA-Z0-9]{0,150}$'
                        value={description} disabled={disabled}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <div className='temp_car_buttons'>
                    <button
                        className={disabled ? 'button' : 'button active'}
                        type='button' onClick={Edit}
                    >Edit</button>
                    <button
                        className='button' type='submit'
                    >Save</button>
                    <button
                        className='button delete'
                        type='button' onClick={Delete}
                    >DELETE</button>
                </div>
            </form>
        </div>);
}

export default EditCarItem;