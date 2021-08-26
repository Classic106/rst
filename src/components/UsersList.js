import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from './Loader';

const axios = require('axios').default;

const UsersList = ()=>{
     const dispatch = useDispatch();

    const [loader, setLoader] = useState(true);

    useEffect(()=>{
        const Func = async ()=>{
            await axios.get('http://localhost:3001/cars/temp')
                .then(cars => {
                    dispatch({type: "SET_SEARCH_RESULT", payload: cars.data})
                })
                .catch(err => {
                    //console.log(err.message);
                });
            setLoader(false);
        }
        Func();
    }, []);

    if(loader) return(<div className="main_container"><Loader /></div>);
    return(<>users</>)
}

export default UsersList;