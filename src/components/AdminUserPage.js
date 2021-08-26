import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import AddAdminUser from './AddAdminUser';
import NewCarsList  from './NewCarsList';
import UsersList from './UsersList';

import '../style/user.scss';

const axios = require('axios').default;

const AdminUserPage = ()=>{

  const dispatch = useDispatch();

  const { user } = useSelector(store => store.user);
  const [choise, setChoise] = useState('');

  /*useEffect(()=>{
    localStorage.setItem('userChoise')
    dispatch({type: "REMOVE_SEARCH_RESULT"});
  }, []);*/

  const changeChoise = e =>{

    const { textContent } = e.target;
    setChoise(textContent);
  }

  if(!user && !user.isAdim) return <Redirect to='/'/>;
  
  return (
    <div className='user'>
      <div className='user_header'>
        <button onClick={changeChoise} className='button'>New cars</button>
        <button onClick={changeChoise} className='button'>Users</button>
        <button onClick={changeChoise} className='button'>Add admin</button>
        <button onClick={changeChoise} className='button'>Messages</button>
      </div>
      <hr/>
      <div className='user_main'>
        {
          (()=>{
            switch(choise){

              case 'New cars':
                return <NewCarsList />;
                break;
              
              case 'Users':
                return <UsersList />;
                break;
              
              case 'Add admin':
                return <AddAdminUser />;
                break;

              default: 
                return <NewCarsList />;
            }
          })()
        }
      </div>
    </div>
  );
}

export default AdminUserPage;