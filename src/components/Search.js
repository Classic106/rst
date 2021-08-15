import React, { useState } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
//import ImageSlider from './ImageSlider';

const Search = ({...props}) => {
    const [result, setResult] = useState([]);
    //console.log(props);
    return (<>
          <Route path='/' component={SearchForm} />
          <Route exact path='/result' component={SearchResult} />
    </>)
}

export default Search;