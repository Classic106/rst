import React, { useState, useEffect } from 'react';

import { MySortArray } from '../helpers';

import NarrowSearchForm from './NarrowSearchForm';

import '../style/search_result.scss';
import '../icomoon/style.css';

const SearchResult = ({ CarItem, searchResult, exact }) => {

    const [result, setResult] = useState(searchResult);
    const [page, setPage] = useState(0);
    const [disabledBack, setDisabledBack] = useState(true);
    const [disabledNext, setDisabledNext] = useState(false);

    const [byDate, setByDate] = useState(0);
    const [byPrice, setByPrice] = useState(0);
    const [byMileage, setByMileage] = useState(0);
    const [byYear, setByYear] = useState(0);
    const [byEngine, setByEngine] = useState(0);
    const [target, setTarget] = useState('');
    
    useEffect(()=>{
        setResult(searchResult);
    }, [searchResult]);

    useEffect(()=>{
        (page <= (result.length/6)-1) ? setDisabledNext(false) : setDisabledNext(true);
        (page !== 0) ? setDisabledBack(false) : setDisabledBack(true);
    }, [page, result]);

    useEffect(() =>{
        
        switch(target){

            case 'date':
                if(byDate === 0) setResult(searchResult);
                if(byDate === 1) setResult(MySortArray(searchResult, 'date', 'DESK'));
                if(byDate === 2) setResult(MySortArray(searchResult, 'date', 'ASK'));
                break;

            case 'price':
                if(byPrice === 0) setResult(searchResult);
                if(byPrice === 1) setResult(MySortArray(searchResult, 'price', 'DESK'));
                if(byPrice === 2) setResult(MySortArray(searchResult, 'price', 'ASK'));
                break;

            case 'year': 
                if(byYear === 0) setResult(searchResult);
                if(byYear === 1) setResult(MySortArray(searchResult, 'year', 'DESK'));
                if(byYear === 2) setResult(MySortArray(searchResult, 'year', 'ASK'));
                break;

            case 'engine':

                if(byEngine === 0) setResult(searchResult);
                if(byEngine === 1) setResult(MySortArray(searchResult, 'engine', 'DESK'));
                if(byEngine === 2) setResult(MySortArray(searchResult, 'engine', 'ASK'));
                return;

            case 'mileage':
                if(byMileage === 0) setResult(searchResult);
                if(byMileage === 1) setResult(MySortArray(searchResult, 'mileage', 'DESK'));
                if(byMileage === 2) setResult(MySortArray(searchResult, 'mileage', 'ASK'));
                return;

            default:
                break;
        }
    }, [byDate, byPrice, byYear, byEngine, byMileage, target]);
    
    const Back = ()=> setPage(page-1);
    
    const Next = ()=> setPage(page+1);

    const Sort = e =>{
        const index = e.target.attributes[0].value;
        
        switch(index){

            case 'date':
                setByDate(byDate+1 === 3 ? 0 : byDate+1);
                setTarget(index);
                break;

            case 'price':
                setByPrice(byPrice+1 === 3 ? 0 : byPrice+1);
                setTarget(index);
                break;

            case 'year': 
                setByYear(byYear+1 === 3 ? 0 : byYear+1);
                setTarget(index);
                break;

            case 'engine': 
                setByEngine(byEngine+1 === 3 ? 0 : byEngine+1);
                setTarget(index);
                break;

            case 'mileage': 
                setByMileage(byMileage+1 === 3 ? 0 : byMileage+1);
                setTarget(index);
                break;

            default:
                break;
        }
    }

    return(
        <div className='search_result'>
        {
            result.length === 0 ?
                <div className='empty'>Empty list</div> : 
            <>
                <div className={exact ? 'cars_result' : 'cars_result admin'}>
                    <div className='sort_items'>
                        <span>Sort by:</span>
                        <label onClick={Sort} index='date'>
                            date
                            <span
                                className={(()=>{
                                    if(byDate === 0) return 'icon-radio-unchecked';
                                    if(byDate === 1) return 'icon-arrow-down';
                                    if(byDate === 2) return 'icon-arrow-up';
                                })()}
                            />
                        </label>
                        <label onClick={Sort} index='price'>
                            price
                            <span
                                className={(()=>{
                                    if(byPrice === 0) return 'icon-radio-unchecked';
                                    if(byPrice === 1) return 'icon-arrow-down';
                                    if(byPrice === 2) return 'icon-arrow-up';
                                })()}
                            />
                        </label>
                        <label onClick={Sort} index='year'>
                            year
                            <span
                                className={(()=>{
                                    if(byYear === 0) return 'icon-radio-unchecked';
                                    if(byYear === 1) return 'icon-arrow-down';
                                    if(byYear === 2) return 'icon-arrow-up';
                                })()}
                            />
                        </label>
                        <label onClick={Sort} index='engine'>
                            engine
                            <span
                                className={(()=>{
                                    if(byEngine === 0) return 'icon-radio-unchecked';
                                    if(byEngine === 1) return 'icon-arrow-down';
                                    if(byEngine === 2) return 'icon-arrow-up';
                                })()}
                            />
                        </label>
                        <label onClick={Sort} index='mileage'>
                            mileage
                            <span
                                className={(()=>{
                                    if(byMileage === 0) return 'icon-radio-unchecked';
                                    if(byMileage === 1) return 'icon-arrow-down';
                                    if(byMileage === 2) return 'icon-arrow-up';
                                })()}
                            />
                        </label>
                    </div>
                    {
                        (result.length > 6) ? <> 
                            <div className='search_result_pages'>
                                <button
                                    onClick={Back}
                                    disabled={disabledBack}
                                    className={disabledBack ? 'button active' : 'button'}
                                >back</button>
                                <span>{page+1}</span>
                                <button
                                    onClick={Next}
                                    disabled={disabledNext}
                                    className={disabledNext ? 'button active' : 'button'}
                                >next</button>
                            </div> 
                            <div className='cars_items'>
                                {
                                    result.slice((page*6)+0, (page*6)+6)
                                    .map(car => <CarItem car={car} key={car._id}/>)
                                }
                            </div>
                            <div className='search_result_pages'>
                                <button
                                    onClick={Back}
                                    disabled={disabledBack}
                                    className={disabledBack ? 'button active' : 'button'}
                                >back</button>
                                <span>{page+1}</span>
                                <button
                                    onClick={Next}
                                    disabled={disabledNext}
                                    className={disabledNext ? 'button active' : 'button'}
                                >next</button>
                            </div>
                        </> : 
                        <div className='cars_items'>
                        {
                            result.map(car => <CarItem car={car} key={car._id}/>)
                        }
                        </div>
                    }
                </div>
            </>
        }
            {
                exact ? <NarrowSearchForm /> : ''
            }
        </div>
    )
}

export default SearchResult;