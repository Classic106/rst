import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import '../style/main.scss';
//import ImageSlider from './ImageSlider';
import User from './User';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import ShowCar from './ShowCar';
import Loader from './Loader';

const axios = require('axios').default;

const Main = () => {

  const [loader, setLoader] = useState(true);
  const { user } = useSelector(store => store.user);
  const { searchResult } = useSelector(store=>store.search);
  const { userChoise } = useSelector(store=>store.search);
  const dispatch = useDispatch();

  useEffect(()=>{
    const Func = async ()=>{

      const userChoise = await localStorage.getItem('userChoise');
      
      if(userChoise){

        const choise = JSON.parse(userChoise);

        dispatch({type: "SET_USER_CHOISE", payload: choise});
        
        const obj = {
          engine: ['0', Number.MAX_VALUE],
          year: ['0', Number.MAX_VALUE],
        };
        
        for(let [key, val] of Object.entries(choise)){
          
          if(val === '-1' || val === '') continue;
          else if(key === 'price') {
            const p = val.split('-');
            let price = ['0', Number.MAX_VALUE];
            price[0] = p[0];
            price[1] = (p[1] === '0') ? Number.MAX_VALUE : p[1];
            obj[key] = price;
          }
          else if(key === 'city' && val !== '') obj[key] = val.replace(/{|}|,|\.|;|\\|:|\//gi, '');
          else if(key === 'yearFrom' || key === 'yearTo'){
            let year = [0, Number.MAX_VALUE];
            if(key === 'yearFrom') year[0] = val;
            if(key === 'yearTo') year[1] = (val === '0') ? Number.MAX_VALUE : val;
            obj.year = year;
            return;
          }
          else if(key === 'engineFrom' || key === 'engineTo'){
            let engine = [0, Number.MAX_VALUE];
            if(key === 'engineFrom') engine[0] = val;
            if(key === 'engineTo') engine[1] = (val === '-1') ? Number.MAX_VALUE : val;
            obj.engine = engine;
            return;
          }
          else obj[key] = val;
        }
        
        await axios.post('http://localhost:3001/cars', obj)
        .then(cars => {
          if(cars.data.length !== 0){
            dispatch({type: "SET_SEARCH_RESULT", payload: cars.data});
            return;
          }
          alert('Nothing found!!!');
        })
        .catch(err => {
          console.log(err.message);
        });
      }

      await axios.get('http://localhost:3001/searchItems')
      .then(val => {
        dispatch({type: 'SET_SEARCH_ITEMS', payload: val.data})
      })
      .catch(err => {
        console.log(err.message);
        alert('Something wrong. Repeat request');
        //return err
      });
      setLoader(false);
    }
    Func();
  }, []);

  if(loader) return(<div className="main_container"><Loader /></div>);
 
  return (
    <div className="main_container">
       <Switch>
          <Route exact path='/'
            render={
              ({history})=>{
                user ? history.push('/user') : 
                  (searchResult.length === 0) ?
                    history.push('/search') : history.push('/result')
              }
            }
          />
          <Route exact path='/user' component={User}/>
          <Route exact path='/search'
            component={()=><SearchForm setLoader={setLoader}/>}
          />
          <Route exact path='/result' component={SearchResult}/>
          <Route path='/result/:id'
            component={({match})=><ShowCar id={match.params.id}/>}
          />
        </Switch>
    </div>
  );
};

export default Main;

/*
user ?
                <Redirect to='user'/> : 
                  (searchResult.length === 0) ? 
                    <Redirect to='search'/> :
                      <Redirect to='result'/>*/

/*  {
        (user) ?
          <Redirect to='user'/> : 
            (searchResult.length === 0) ? 
              <Redirect to='search'/> :
                <Redirect to='result'/>
    }
*/
/*
 return (
    <div className="main_container">
      {!user ?
        <>
          <Search />
          <ImageSlider />
        </> : <User/>
      }
    </>
*/