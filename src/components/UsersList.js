import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MySortArray } from '../helpers';

import Loader from './Loader';
import UserItem from './UserItem';

import '../style/user_list.scss';
import '../icomoon/style.css';

const axios = require('axios').default;

const UsersList = ()=>{

    const dispatch = useDispatch();
    
    const { searchResult } = useSelector(store => store.search);
    
    const [loader, setLoader] = useState(true);
    const [result, setResult] = useState(searchResult);

    const [byDate, setByDate] = useState(0);
    const [byIsDeleted, setByIsDeleted] = useState(0);
    const [byIsAdmin, setByIsAdmin] = useState(0);
    const [target, setTarget] = useState('');

    useEffect(()=>{
        setResult(searchResult);
    }, [searchResult]);

    useEffect(()=>{
        const Func = async ()=>{
            await axios.get('http://localhost:3001/users')
                .then(users => {
                    //console.log(users.data);
                    dispatch({type: "SET_SEARCH_RESULT", payload: users.data});
                })
                .catch(err => {
                    //console.log(err.message);
                });
            setLoader(false);
        }
        Func();

        return(()=> dispatch({type: "REMOVE_SEARCH_ITEMS"}));
    
    }, [dispatch]);
    
    useEffect(()=>{

        switch(target){

            case 'date':
                if(byDate === 0) setResult(searchResult);
                if(byDate === 1) setResult(MySortArray(searchResult, 'date', 'DESK'));
                if(byDate === 2) setResult(MySortArray(searchResult, 'date', 'ASK'));
                break;

            case 'admin':
                
                if(byIsAdmin === 0) setResult(searchResult);
                if(byIsAdmin === 1) setResult(MySortArray(searchResult, 'isAdmin', 'DESK'));
                if(byIsAdmin === 2) setResult(MySortArray(searchResult, 'isAdmin', 'ASK'));
                break;

            case 'deleted': 

                if(byIsDeleted === 0) setResult(searchResult);
                if(byIsDeleted === 1) setResult(MySortArray(searchResult, 'deleteDate', 'DESK'));
                if(byIsDeleted === 2) setResult(MySortArray(searchResult, 'deleteDate', 'ASK'));
                break;

            default:
                break;
        }

    }, [byDate, byIsAdmin, byIsDeleted, target]);

    const Sort = e =>{
        const index = e.target.attributes[0].value;
        
        switch(index){

            case 'date':
                setByDate(byDate+1 === 3 ? 0 : byDate+1);
                setTarget(index);
                break;

            case 'admin':
                setByIsAdmin(byIsAdmin+1 === 3 ? 0 : byIsAdmin+1);
                setTarget(index);
                break;

            case 'deleted': 
                setByIsDeleted(byIsDeleted+1 === 3 ? 0 : byIsDeleted+1);
                setTarget(index);
                break;

            default:
                break;
        }
    }

    if(loader) return(<div className="main_container"><Loader /></div>);

    return(
        <div className='search_result'>
            <div className='user_list'>
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
                    <label onClick={Sort} index='admin'>
                        admin
                        <span
                            className={(()=>{
                                if(byIsAdmin === 0) return 'icon-radio-unchecked';
                                if(byIsAdmin === 1) return 'icon-arrow-down';
                                if(byIsAdmin === 2) return 'icon-arrow-up';
                            })()}
                        />
                    </label>
                    <label onClick={Sort} index='deleted'>
                        deleted
                        <span 
                            className={(()=>{
                                if(byIsDeleted === 0) return 'icon-radio-unchecked';
                                if(byIsDeleted === 1) return 'icon-arrow-down';
                                if(byIsDeleted === 2) return 'icon-arrow-up';
                            })()}
                        />
                    </label>
                </div>
                <div className='user_items'>
                {
                    result.map(user =>
                        <UserItem user={user} key={user._id} />)
                }
                </div>
            </div>
        </div>
    ) 
}

export default UsersList;