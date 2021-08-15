import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import CarItem from "./CarItem";
import NarrowSearchForm from './NarrowSearchForm';

const SearchResult = () => {
   
    const { searchResult } = useSelector(store => store.search);
    const [result, setResult] = useState([]);
    const [page, setPage] = useState(0);
    const [disabledBack, setDisabledBack] = useState(true);
    const [disabledNext, setDisabledNext] = useState(false);

    const [byDate, setByDate] = useState(0);
    const [byPrice, setByPrice] = useState(0);
    const [byMileage, setByMileage] = useState(0);
    const [byYear, setByYear] = useState(0);

    const dispatch = useDispatch();

    useEffect(()=>{
        setResult(searchResult);
    }, [searchResult])
    
    const Back = ()=>{
        if(page !== 0) {
            setPage(page-1);
            if(disabledNext) setDisabledNext(false);
        }else setDisabledBack(true);
    };
    
    const Next = ()=>{
        if(page <= (result.length/6)){
            setPage(page+1);
            if(disabledBack) setDisabledBack(false);
        }else setDisabledNext(true); 
    };
    
    const byDateUp = (a, b) =>{
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
        return 0;
    }
    const byDateDown = (a, b) =>{
        if(a.date > b.date) return -1;
        if(a.date < b.date) return 1;
        return 0;
    }
    const byMileageUp = (a, b)=>{
        if(a.mileage < b.mileage) return -1;
        if(a.mileage > b.mileage) return 1;
        return 0;
    }
    const byMileageDown = (a, b)=>{
        if(a.mileage > b.mileage) return -1;
        if(a.mileage < b.mileage) return 1;
        return 0;
    }
    const byPriceUp = (a, b)=>{
        if(a.price < b.price) return -1;
        if(a.price > b.price) return 1;
        return 0;
    }
    const byPriceDown = (a, b)=>{
        if(a.price > b.price) return -1;
        if(a.price < b.price) return 1;
        return 0;
    }
    const byYearUp = (a, b)=>{
        if(a.year < b.year) return -1;
        if(a.year > b.year) return 1;
        return 0;
    }
    const byYearDown = (a, b)=>{
        if(a.year > b.year) return -1;
        if(a.year < b.year) return 1;
        return 0;
    }
    
    const Sort = e =>{
        const { textContent } = e.target;
        
        switch(textContent){

            case 'date':
                if(byDate === 0) setResult([...searchResult]);
                if(byDate === 1) setResult([...searchResult].sort(byDateUp));
                if(byDate === 2) setResult([...searchResult].sort(byDateDown));
                setByDate((byDate+1) === 3 ? 0 : byDate+1);
                return;

            case 'price':
                
                if(byPrice === 0) setResult([...searchResult]);
                if(byPrice === 1) setResult([...searchResult].sort(byPriceUp));
                if(byPrice === 2) setResult([...searchResult].sort(byPriceDown));
                setByPrice((byPrice+1) === 3 ? 0 : byPrice+1);
                return;

            case 'year': 

                if(byYear === 0) setResult([...searchResult]);
                if(byYear === 1) setResult([...searchResult].sort(byYearUp));
                if(byYear === 2) setResult([...searchResult].sort(byYearDown));
                setByYear((byYear+1) === 3 ? 0 : byYear+1);
                return;

            case 'mileage':

                if(byMileage === 0) setResult([...searchResult]);
                if(byMileage === 1) setResult([...searchResult].sort(byMileageUp));
                if(byMileage === 2) setResult([...searchResult].sort(byMileageDown));
                setByMileage((byMileage+1) === 3 ? 0 : byMileage+1);
                return;

            default:
                console.log('Wrong sort');
        }
    }

    return(
        <div className='search_result'>
            <div className='cars_result'>
                <div className='sort_items'>
                    <span>Sort by:</span>
                    <span onClick={Sort}>date</span>
                    <span onClick={Sort}>price</span>
                    <span onClick={Sort}>year</span>
                    <span onClick={Sort}>mileage</span>
                </div>
                {
                    (result.length > 6) ? <> 
                        <div className='search_ressult_pages'>
                            <button onClick={Back} disabled={disabledBack}>back</button>
                            <span>{page+1}</span>
                            <button onClick={Next} disabled={disabledNext}>next</button>
                        </div> 
                        <div className='cars_items'>
                            {
                                result.slice((page*6)+0, (page*6)+6)
                                .map(car => <CarItem car={car} key={car._id}/>)
                            }
                        </div>
                        <div className='search_ressult_pages'>
                            <button onClick={Back} disabled={disabledBack}>back</button>
                            <span>{page+1}</span>
                            <button onClick={Next} disabled={disabledNext}>next</button>
                        </div>
                    </> : 
                    <div className='cars_items'>
                    {
                        result.map(car => <CarItem car={car} key={car._id}/>)
                    }
                    </div>
                }
            </div>
            <NarrowSearchForm />
        </div>
    )
}

export default SearchResult;