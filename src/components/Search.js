import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import CarItem from './CarItem';
import Loader from './Loader';

const Search = () => {
    
    const { searchResult } = useSelector(store => store.search);
    const { searchItems } = useSelector(store => store.search);

    const [result, setResult] = useState(searchResult || []);
    const [loader, setLoader] = useState(true);
    console.log(result);
    useEffect(()=>{
        setResult(searchResult);
        setLoader(false);
    }, [searchResult]);
    
    if(loader) return <Loader/>;

    return result.length > 0 ?
        <SearchResult
            CarItem={CarItem}
            searchResult={result}
            exact
        /> : <SearchForm/>;
}

export default Search;