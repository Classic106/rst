import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const AddCarForm = () => {

    const Submit = e =>{
        e.preventDefault();
    }
    
    return <div className='addCarForm' className='add_car'>
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
            <input type='text' value={0}/>
        </label>
        
        <label>
            Model: 
            <input type='text' value={0}/>
        </label>
        
        <label>
            Modification: 
            <input type='text' value={0}/>
        </label>
        
        <label>
            Price: 
            <input type='text' value={0}/>
        </label>
        
        <label>
            Year: 
            <input type='text' value={0}/>
        </label>
        
        <label>
            Engine: 
            <input type='text' value={0}/>
        </label>
        
        <label>
          Fuel
          <select name="fuel" tabIndex="15">
            <option value="0">----</option>
            <option value="1">Petrol</option>
            <option value="2">Diesel</option>
            <option value="3">Petrol/Gas</option>
            <option value="4">Electro</option>
            <option value="5">Gibride</option>
          </select>
        </label>
    </div>

    <div className='form_right'>
    <label>
            Mileage: 
            <input type='text' value={0}/>
        </label>

        <label>
          Transmission
          <select name="transmission">
            <option value="0">----</option>
            <option value="1">Automat</option>
            <option value="2">Mechanic</option>
          </select>
        </label>

        <label>
          Drive
          <select name="transmission">
            <option value="0">----</option>
            <option value="1">Front wheel</option>
            <option value="2">Rear wheel</option>
            <option value="3">Full drive</option>
          </select>
        </label>

        <label>
            Colour: 
            <input type='text' value={0}/>
        </label>

        <label>
          Condition
          <select name="condition">
            <option value="0">----</option>
            <option value="1">No investment required</option>
            <option value="2">New</option>
            <option value="3">Good condition</option>
            <option value="4">Needs repair</option>
            <option value="5">After an accident</option>
            <option value="6">For parts</option>
            <option value="7">Problematic documents</option>
          </select>
        </label>

        <label>
            City: 
            <input type='text' value={0}/>
        </label>
        <label>
            Exchange:
            <input type="checkbox" name='exchange'/>
      </label>
    </div>
    </div>
        <label className='car_descr'>
            Description: 
            <textarea type='text' value={0}/>
        </label>
        <div>
        <div id="upload-container">
        <img id="upload-image" src="/img/upload.png" alt="Фотография"/>
        <Dropzone
          onDrop={()=>{}}
          accept="image/*"
          multiple
        >
        {({getRootProps, getInputProps}) => (
          <form id="formaddphoto" {...getRootProps()}>
        	  <input {...getInputProps()} id="file-input" type="file" accept=".jpg, .jpeg, .png" multiple/>
        	  <label htmlFor="file-input">Выберите файл</label>
        	  <span> или перетащите его сюда</span>
          </form>
          )}
        </Dropzone>
        </div>
    </div>
        <button type='submit' className='button'>Add ad</button>
    </form>
    </section>
    </div>
}

export default AddCarForm;