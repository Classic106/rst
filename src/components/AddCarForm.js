import React, { useState } from 'react';
import { useSelector } from "react-redux";

import Dropzone from 'react-dropzone';

import Upload from '../images/upload.svg';
import '../style/addphoto.css';
import '../style/add_car.scss';

const axios = require('axios').default;

const AddCarForm = () => {

    const [images, setImages] = useState(false);
    const [imgs, setImgs] = useState([]);
    const { user } = useSelector(store => store.user);

    const Submit = e =>{
        e.preventDefault();
        
        const obj = {images: imgs};
        //new FormData(e.target).forEach((value, key) => obj[key] = value);
        for(let key = 0; key < e.target.length-2; key++){
            if(e.target[key].type === 'checkbox') 
                obj[e.target[key].name] = e.target[key].checked;
            else obj[e.target[key].name] = e.target[key].value;
        }

        axios.post('http://localhost:3001/cars/addTemp', obj)
        .then(cars => {
            if(images)
                axios.post(
                    'http://localhost:3001/cars/uploadTemp/'+cars.data._id,
                    images,
                    {
                        headers: {
                        'Content-Type': 'multipart/form-data; boundary=something'
                    }
                });
            alert('Entry added!!!');
        })
        .catch(err => {
            console.log(err.message);
        });
    }

  const onDrop = acceptedFiles => {

    let f = new FormData();
    let i = [];
    
    for(let key in acceptedFiles){

        const newfile = new File(
            [acceptedFiles[key]],
            `${user._id+Date.now()}${key}.${acceptedFiles[key].type.match(/(?<=\/).+/)[0]}`,
            { type: acceptedFiles[key].type }
        );

        f.append('file', newfile);
        i.push(newfile.name);
    }
    setImgs(i);
    setImages(f);
  }

    return <div className='add_car'>
    <section>
        <article>
            <p>Подавая объявление о продаже машины, либо другого транспортного средства, Вы обязуетесь указывать только достоверную информацию, соответствующую действительности, а также даете однозначное согласие на обработку и публикацию обезличенных, либо персональных данных, если таковые имеются.</p>
            <p>Редактор объявлений оставляет за собой право, в одностороннем порядке, определить рубрику, отказать в публикации, либо удалить размещенную информацию без объяснения причин.</p>
        </article>
    </section>
    <section>
    <h3>Submission of an advertisement for the sale of a car</h3>
    <form onSubmit={Submit} className='add_car_form'>
    <div>
    <div className='form_left'>
        <label>
            Manufacturer:
            <input type='text' name='manufacturer' required pattern='[a-zA-Z]{0,20}'/>
        </label>
        
        <label>
            Model: 
            <input type='text' name='model' required pattern='[a-zA-Z0-9]{0,20}'/>
        </label>
        
        <label>
            Price: 
            <input type='text' name='price' required pattern='[0-9]{0,10}'/>
        </label>
        
        <label>
            Year:
            <select name="year" required>
                <option value=''>---</option>
                {(() => {
                    let arr = [];
                    for (let key = 1930; key <= new Date().getFullYear(); key++)
                    arr.push(key);
                    return arr.map(val => (
                    <option key={val} value={val}>
                        {val}
                    </option>
                    ));
                })()}
            </select>
        </label>
        
        <label>
            Engine: 
            <input type='text' name='engine' required pattern='^\d{0,1}\.?\d{0,3}$'/>
        </label>
        
        <label>
          Fuel
          <select name="fuel" tabIndex="15" required>
            <option value="">----</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol/Gas">Petrol/Gas</option>
            <option value="Electro">Electro</option>
            <option value="Gibride">Gibride</option>
          </select>
        </label>
    </div>

    <div className='form_right'>
        <label>
            Mileage: 
            <input type='text' name='mileage' required pattern='^[0-9]{0,7}$'/>
        </label>

        <label>
          Transmission
          <select name="transmission" required>
            <option value="">----</option>
            <option value="Automat">Automat</option>
            <option value="Mechanic">Mechanic</option>
          </select>
        </label>

        <label>
            Drive
            <select name="drive" required>
                <option value="">----</option>
                <option value="Front wheel">Front wheel</option>
                <option value="Rear wheel">Rear wheel</option>
                <option value="Full drive">Full drive</option>
            </select>
        </label>

        <label>
            Colour: 
            <input type='text' name='color' required pattern='^[a-zA-Z]{0,15}$'/>
        </label>

        <label>
          Condition
          <select name="condition" required>
            <option value="">----</option>
            <option value="New">New</option>
            <option value="No investment required">No investment required</option>
            <option value="Good condition">Good condition</option>
            <option value="Needs repair">Needs repair</option>
            <option value="After an accident">After an accident</option>
            <option value="For parts">For parts</option>
            <option value="Problematic documents">Problematic documents</option>
          </select>
        </label>

        <label>
            City: 
            <input type='text' name='city' required pattern='^[a-zA-Z]{0,30}$'/>
        </label>
        <label>
            Exchange:
            <input type="checkbox" name='exchange'/>
        </label>
    </div>
    </div>
        <label className='car_descr'>
            Description: 
            <textarea type='text' name='description' pattern='^[a-zA-Z0-9]{0,150}$'/>
        </label>
     
        <div id="upload-container">
            <img id="upload-image" src={Upload} alt="Фотография"/>
            <Dropzone
                onDrop={onDrop}
                accept="image/*"
                multiple
            >
            {({getRootProps, getInputProps}) => (
                <div id="formaddphoto" {...getRootProps()}>
                    <input {...getInputProps()}
                        id="file-input"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        multiple
                        name='pic'
                    />
                    <label><span>Выберите файл</span> или перетащите его сюда</label>
                </div>
            )}
            </Dropzone>
        </div>
        <button type='submit' className='button'>Add ad</button>
    </form>
    </section>
    </div>
}

export default AddCarForm;