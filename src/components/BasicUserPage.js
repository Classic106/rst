import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import SearchResult from './SearchResult';
import UserCars from './UserCars';
import AddCarForm from './AddCarForm';
import CarItem from './CarItem';
import UserProfile from './UserProfile';

import '../style/user.scss';

const BasicUserPage = ()=>{

  const { user } = useSelector(store => store.user);
  const [choise, setChoise] = useState('');

  const changeChoise = e =>{
    const { textContent } = e.target;
    setChoise(textContent);
  }

  if(!user) return <Redirect to='/'/>;
  
  return (
    <div className='user'>
      <div className='user_header'>
        <button onClick={changeChoise} className='button'>Search</button>
        <button onClick={changeChoise} className='button'>My cars</button>
        <button onClick={changeChoise} className='button'>Add car</button>
        <button onClick={changeChoise} className='button'>Edit profile</button>
        <button onClick={changeChoise} className='button'>Message to admin</button>
      </div>
      <hr/>
      <div className='user_main'>
        {
          (()=>{
            switch(choise){

              case 'Search':
                return <SearchResult CarItem={CarItem} exact/>;
                break;
              
              case 'My cars':
                  return <UserCars />;
                  break;

              case 'Add car':
                return <AddCarForm />;
                break;

              case 'Edit profile':
                return <UserProfile />;
                break;
              
              default: 
                return <SearchResult CarItem={CarItem} exact/>;
            }
          })()
        }
      </div>
    </div>
  );
}

export default BasicUserPage;