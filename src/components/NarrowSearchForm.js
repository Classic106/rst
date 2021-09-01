import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const axios = require('axios').default;

const NarrowSearchForm = ()=>{

  const dispatch = useDispatch();

  const { searchItems } = useSelector(store => store.search);
  const [userChoise, setUserChoise] = useState(useSelector(store => store.search.userChoise));

  const [index, setIndex] = useState('-1');
  const [addSittings, setAddSittings] = useState(false);
  
  const changeCouise = e => {
    const {name, value} = e.target;
    
    if(name === 'manufacturer'){
      let index = '-1';
    
      if(userChoise.manufacturer !== '-1') {
        index = searchItems.findIndex(val => val.manufacturer === value);
        setIndex(''+index);
      }
    }
    
    userChoise[name] = value;
    dispatch({type: "SET_USER_CHOISE", payload: userChoise});
  }

  useEffect(()=>{

    let index = '-1';
    
    if(userChoise.manufacturer !== '-1') {
      index = searchItems.findIndex(val=> val.manufacturer === userChoise.manufacturer)
      setIndex(''+index);
    }
  }, [userChoise, searchItems]);

  const Reset = ()=>{
    const select = document.querySelectorAll('select');
    const input = document.querySelectorAll('input');
   
    for(let key = 0; key < select.length; key++){
      select[key].name === 'price' ?
        select[key].value = '0-0' : select[key].value = '';
    }
    for(let key = 0; key < input.length; key++) {
        if(input[key].type === 'checkbox') input[key].checked = false;
        if(input[key].type === 'text') input[key].value = '';
      }
    setUserChoise({});
    dispatch({type: "REMOVE_USER_CHOISE"});
    localStorage.removeItem('userChoise');
  }

  const Submit = e =>{

    e.preventDefault();
    
    const obj = {
      engine: ['0', Number.MAX_VALUE],
      year: ['0', Number.MAX_VALUE],
      price: ['0', Number.MAX_VALUE],
    };
    const choise = {};

    new FormData(e.target).forEach((val, key) => {
      
      choise[key] = val;

      if(!val) return;
      else if(e.target[key].type === 'checkbox') 
        obj[e.target[key].name] = e.target[key].checked;
      else if(key === 'price') {
        const p = val.split('-');
        let price = ['0', Number.MAX_VALUE];
        price[0] = p[0];
        price[1] = (p[1] === '0') ? Number.MAX_VALUE : p[1];
        obj.price = price;
      }
      else if(key === 'city' && val !== '') obj[key] = val.replace(/{|}|,|\.|;|\\|:|\//gi, '');
      else if(key === 'yearFrom' || key === 'yearTo'){
        if(key === 'yearFrom') obj.year[0] = val;
        if(key === 'yearTo') obj.year[1] = (val === '0') ? Number.MAX_VALUE : val;
        return;
      }
      else if(key === 'engineFrom' || key === 'engineTo'){
        if(key === 'engineFrom') obj.engine[0] = val;
        if(key === 'engineTo') obj.engine[1] = (val === '0') ? Number.MAX_VALUE : val;
        return;
      }
      else obj[key] = val;
    });
   
    axios.post('http://localhost:3001/cars', obj)
    .then(cars => {
      if(cars.data.length !== 0){
        localStorage.setItem('userChoise', JSON.stringify(choise));
        dispatch({type: "SET_USER_CHOISE", payload: choise});
        dispatch({type: "SET_SEARCH_RESULT", payload: cars.data});
        return;
      }
      alert('Nothing found!!!');
    })
    .catch(err => {
      //console.log(err.message);
    });
  }

  return (
    <div className='narrow_container'>
    <form
      className="search_form narrow_form"
      onSubmit={Submit}
    >
      <div className="search_header">
        <h3>Search cars</h3>
      </div>

      <label>
        Manufacturer
        <select name="manufacturer" onChange={changeCouise} value={userChoise.manufacturer}>
          <option value=''>----</option>
          {
            searchItems.map((val, index) =>
              <option
                key={val.manufacturer}
                value={val.manufacturer}
              >
                {val.manufacturer}
              </option>)
          }*/
        </select>
      </label>

      <label>
        Model
        <select
          name="model"
          disabled={index !== '-1' ? false : true}
          value={userChoise.model}
          onChange={changeCouise}
        >
          <option value=''>----</option>
          {(index !== '-1' && searchItems.length) ? searchItems[+index].models
            .map(val => <option key={val} value={val}>{val}</option>) : ''
          }
        </select>
      </label>

      <div className='search_checkboxes'>
        <span className='reset_settings' onClick={Reset}>reset settings</span>
        <label>
          <input type="checkbox" name='exchange'/>
          exchange
        </label>
      </div>

      <button className='search_button' type='submit'>Search</button>

      <label>
        Price
        <select tabIndex="6" name="price" value={userChoise.price} onChange={changeCouise}>
          <option value="0-0">----</option>
          <option value="0-300">$0 - $300</option>
          <option value="300-500">$300 - $500</option>
          <option value="500-1000">$500 - $1'000</option>
          <option value="1000-1500">$1'000 - $1'500</option>
          <option value="1400-2000">$1'400 - $2'000</option>
          <option value="1700-2500">$1'700 - $2'500</option>
          <option value="2000-3000">$2'000 - $3'000</option>
          <option value="2500-3500">$2'500 - $3'500</option>
          <option value="3000-4500">$3'000 - $4'500</option>
          <option value="3500-5000">$3'500 - $5'000</option>
          <option value="4000-6000">$4'000 - $6'000</option>
          <option value="4500-7000">$4'500 - $7'000</option>
          <option value="5500-8000">$5'500 - $8'000</option>
          <option value="6500-9000">$6'500 - $9'000</option>
          <option value="7000-10000">$7'000 - $10'000</option>
          <option value="7500-11000">$7'500 - $11'000</option>
          <option value="8500-12500">$8'500 - $12'500</option>
          <option value="10000-14000">$10'000 - $14'000</option>
          <option value="11000-15000">$11'000 - $15'000</option>
          <option value="12000-17500">$12'000 - $17'500</option>
          <option value="14000-20000">$14'000 - $20'000</option>
          <option value="15000-22500">$15'000 - $22'500</option>
          <option value="17000-25000">$17'000 - $25'000</option>
          <option value="19000-27500">$19'000 - $27'500</option>
          <option value="21000-30000">$21'000 - $30'000</option>
          <option value="24000-35000">$24'000 - $35'000</option>
          <option value="28000-40000">$28'000 - $40'000</option>
          <option value="30000-45000">$30'000 - $45'000</option>
          <option value="35000-50000">$35'000 - $50'000</option>
          <option value="40000-60000">$40'000 - $60'000</option>
          <option value="50000-75000">$50'000 - $75'000</option>
          <option value="70000-0">более $70'000</option>
          <option value="100000-0">более $100'000</option>
        </select>
      </label>

      <label>
        Year
        <div className='year_label'>
        <select name="yearFrom" value={userChoise.yearFrom} onChange={changeCouise}>
          <option value=''>from</option>
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
        <select name="yearTo" value={userChoise.yearTo} onChange={changeCouise}>
          <option value=''>to</option>
          {(() => {
            let arr = [];
            for (let key = new Date().getFullYear(); key >= 1930; key--)
              arr.push(key);
            return arr.map(val => (
              <option key={val} value={val}>
                {val}
              </option>
            ));
          })()}
        </select>
        </div>
      </label>

      <label>
        City: 
        <input type='text' name='city' value={userChoise.city} onChange={changeCouise}/>
      </label>

      <label>
        Condition
        <select name="condition" value={userChoise.condition} onChange={changeCouise}>
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

      <button
          type='button'
          className='additional_settings_button'
          onClick={()=>setAddSittings(!addSittings)}
        >
          + Additional settings
        </button>

        {addSittings ?
          <NarrowAdditionalSittings
            userChoise={userChoise}
            changeCouise={changeCouise}
          /> : ''}

    </form>
    </div>
  );
};

const NarrowAdditionalSittings = ({ userChoise, changeCouise })=>{

  return(
    <div className='narrow_additional_settings'>

      <label>
        Engine
        <div className='engine_label'>
        <select name="engineFrom" value={userChoise.engineFrom} onChange={changeCouise}>
          <option value=''>----</option>
          {(() => {
            let arr = [];
            for (let key = 1; key <= 6.5; key += 0.5) arr.push(key);
            return arr.map(val => <option key={val} value={val}>{val}</option>);
          })()}
        </select>
        <select name="engineTo" value={userChoise.engineTo} onChange={changeCouise}>
          <option value=''>----</option>
          {(() => {
            let arr = [];
            for (let key = 1; key <= 6.5; key += 0.5) arr.push(key);
            return arr.map(val => <option key={val} value={val}>{val}</option>);
          })()}
        </select>
        </div>
      </label>

      <label>
        Fuel
        <select name="fuel" tabIndex="15" value={userChoise.fuel} onChange={changeCouise}>
          <option value="">----</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Petrol/Gas">Petrol/Gas</option>
          <option value="Electro">Electro</option>
          <option value="Gibride">Gibride</option>
        </select>
      </label>

      <label>
        Transmission
        <select name="transmission" value={userChoise.transmission} onChange={changeCouise}>
          <option value="">----</option>
          <option value="Automat">Automat</option>
          <option value="Mechanic">Mechanic</option>
        </select>
      </label>

      <label>
        Drive
        <select name="drive" value={userChoise.drive} onChange={changeCouise}>
          <option value="">----</option>
          <option value="Front wheel">Front wheel</option>
          <option value="Rear wheel">Rear wheel</option>
          <option value="Full drive">Full drive</option>
        </select>
      </label>
    </div>
  )
}

export default NarrowSearchForm;
