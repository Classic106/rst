import React from "react";
import { useHistory } from "react-router-dom";

import NotFound from '../images/notFound.png';

import '../style/not_found.scss';

const PageNotFound = ()=>{

    const history = useHistory();

    const Click = ()=> history.push('/search');

    return(
        <div className='not_found'>
            <img src={NotFound} alt='notFound'/>
            <button onClick={Click}/>
        </div>
    )
}

export default PageNotFound;