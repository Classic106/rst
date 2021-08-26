import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditCarItem from './EditCarItem';

import '../style/user_cars.scss';

const axios = require('axios').default;

const UserCars = ()=>{

    const { user } = useSelector(store => store.user);

    return(<div className='user_cars'>
        {
            user.carsId.length === 0 ?
                <span className='empty'>Empty</span> :
                    user.carsId.map(car => <EditCarItem car={car} key={car._id}/>)
        }
    </div>)
}

export default UserCars;