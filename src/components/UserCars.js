import React, { useEffect, useState } from "react";

const axios = require('axios').default;

const UserCars = ({carsId})=>{

    const [cars, setCars] = useState([]);

    useEffect(async ()=>{
        let cars = [];
        for(let id of carsId){
            await axios.get('http://localhost:3001/carss/'+id)
            .then(car => cars.push(car))
            .catch(err => {
                //console.log(err.message);
            }); 
        }
        setCars(cars);
    }, [setCars]);

    return(<div>
        {
            cars.length === 0 ? <span>Empty</span> : cars.map(car => <div>{car.model}</div>)
        }
    </div>)
}

export default UserCars;