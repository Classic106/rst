import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import NewCarItem from './NewCarItem';
import SearchResult from './SearchResult';
import Loader from './Loader';

const axios = require('axios').default;

const NewCarsList = ()=>{
    
    const dispatch = useDispatch();
    
    const { searchResult } = useSelector(store => store.search);
    
    const [loader, setLoader] = useState(true);

    useEffect(()=>{
        const Func = async ()=>{
            await axios.get('http://localhost:3001/cars/temp')
                .then(cars => {
                    //console.log(cars.data);
                    dispatch({type: "SET_SEARCH_RESULT", payload: cars.data})
                })
                .catch(err => {
                    //console.log(err.message);
                });
            setLoader(false);
        }
        Func();

        return(()=> dispatch({type: "REMOVE_SEARCH_ITEMS"}));
    }, [dispatch]);

    if(loader) return(<div className="main_container"><Loader /></div>);

    return(<SearchResult CarItem={NewCarItem} searchResult={searchResult}/>);
}

export default NewCarsList;
