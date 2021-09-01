import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SearchResult from './SearchResult';
import EditCarItem from './EditCarItem';
import Loader from './Loader';

import '../style/user_cars.scss';

const axios = require('axios').default;

const UserCars = ()=>{

    const dispatch = useDispatch();

    const { user } = useSelector(store => store.user);
    
    const [cars, setCars] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(()=>{
        setCars(user.carsId);
    }, [user]);
    
    useEffect(()=>{
        
        const u = false;

        const Func = async ()=>{

            await axios.get('http://localhost:3001/users/auth')
                .then(user => {
                    setCars(user.data.carsId);
                    u = user.data;
                })
                .catch(err => {
                    //console.log(err.message);
                });

                setLoader(false);
            }
        Func();

        return(()=> {
            if(u) dispatch({type: 'SET_USER', payload: u});
        });
    }, []);
  
    if(loader) return(<div className="main_container"><Loader /></div>);
  
    return(
        <div className='user_cars'>
            <SearchResult CarItem={EditCarItem} searchResult={cars}/>
        </div>
    )
}

export default UserCars;