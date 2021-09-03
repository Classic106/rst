import React, { useEffect, useState } from 'react';
//import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import '../style/main.scss';

import BasicUserPage from './BasicUserPage';
import AdminUserPage from './AdminUserPage';
import Search from './Search';
import Loader from './Loader';
import PageNotFound from './PageNotFound';

const axios = require('axios').default;

const Main = ({ loader, setLoader }) => {
  
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector(store => store.user);
  
  useEffect(()=>{
    const Func = async ()=>{
     
      const userChoise = await localStorage.getItem('userChoise');
      
      if(userChoise){

        const choise = JSON.parse(userChoise);

        dispatch({type: "SET_USER_CHOISE", payload: choise});
        
        const obj = {
          engine: ['0', Number.MAX_VALUE],
          year: ['0', Number.MAX_VALUE],
          price: ['0', Number.MAX_VALUE],
        };
        
        for(let [key, val] of Object.entries(choise)){
          
          if(val === '-1' || val === '') continue;
          else if(key === 'price') {
            const p = val.split('-');
            obj.price[0] = p[0];
            obj.price[1] = (p[1] === '0') ? Number.MAX_VALUE : p[1];
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
          alert('Something wrong. Reload page!!!');
        //return err
      });
    }
    Func();
  }, [dispatch]);

  useEffect(()=>{
  
    if(user) user.isAdmin ?
      history.replace('/admin/newcars') : history.replace('/user/cars'); 
    else history.replace('/search');
       
  }, [history, user]);

  if(loader) return(<div className="main_container"><Loader /></div>);
  
  return (
    <div className="main_container">
      <Switch>
        <Route exact path='/' component={First}/>
        <Route path='/search' component={Search}/>
        <Route path='/user/:link' component={BasicUserPage}/>
        <Route path='/admin/:link' component={AdminUserPage}/>
        <Route path='/:notFound' component={PageNotFound}/>
      </Switch>
    </div>
  );
};

export default Main;

const First = ()=>{

  const history = useHistory();
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(true);

  useEffect(()=>{
    const Func = async()=>{
       await axios.get('http://localhost:3001/searchItems')
        .then(val => {
          dispatch({type: 'SET_SEARCH_ITEMS', payload: val.data})
        })
        .catch(err => {
          alert('Something wrong. Reload page!!!');
          //return err
        });
      setLoader(false);
    }
    Func();
  });

  if(loader) return(<div className="main_container"><Loader /></div>);

  return(<Redirect to='/search'/>);
}

/*
return (
    <div className="main_container">
      <SwitchTransition>
        <CSSTransition
          timeout={250}
          classNames='fade'
          key={history.location.key}
        >
          <Switch location={history.location}>
            <Route exact path='/' component={First}/>
            <Route path='/search' component={Search}/>
            <Route path='/user/:link' component={BasicUserPage}/>
            <Route path='/admin/:link' component={AdminUserPage}/>
            <Route path='/:notFound' component={PageNotFound}/>
          </Switch>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );*/ 