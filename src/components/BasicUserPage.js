import React, { useState, useEffect } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { Switch, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import SearchResult from './SearchResult';
import UserCars from './UserCars';
import AddCarForm from './AddCarForm';
import ShowCar from './ShowCar';
import CarItem from './CarItem';
import UserProfile from './UserProfile';
import PageNotFound from './PageNotFound';

import '../style/user.scss';

const BasicUserPage = ()=>{

  const history = useHistory();
  
  const locationState = history.location.state;
  //console.log(history.location);
  const { searchResult } = useSelector(store => store.search);
  
  const [buttonIndex, setButtonIndex] = useState(0);
  const [activeMyCars, setActiveMyCars] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeAddCar, setActiveAddCar] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);
  const [activeMessage, setActiveMessage] = useState(false);
  
  useEffect(()=>{
    setButtonIndex(locationState === undefined ? 1 : locationState);
  }, [locationState]);
 
  useEffect(()=>{
    buttonIndex === 0 ? setActiveSearch(true) : setActiveSearch(false);
    buttonIndex === 1 ? setActiveMyCars(true) : setActiveMyCars(false);
    buttonIndex === 2 ? setActiveAddCar(true) : setActiveAddCar(false);
    buttonIndex === 3 ? setActiveEdit(true) : setActiveEdit(false);
    buttonIndex === 4 ? setActiveMessage(true) : setActiveMessage(false);
  }, [buttonIndex]);
  
  const Click = e =>{
    const index = +e.target.attributes[1].value;
    setButtonIndex(index);
    return index;
  }

  return (
    <div className='user'>
      <div className='user_header'>
        <button
          onClick={e => history.push("/user/search", Click(e))}
          className={activeSearch ? 'button active' : 'button'}
          index='0'
            >Search</button>
        <button
          onClick={e => history.push("/user/cars", Click(e))}
          className={activeMyCars ? 'button active' : 'button'}
          index='1'
            >My cars</button>
        <button
          onClick={e => history.push("/user/addcar", Click(e))}
          className={activeAddCar ? 'button active' : 'button'}
          index='2'
            >Add car</button>
        <button
          onClick={e => history.push("/user/profile", Click(e))}
          className={activeEdit ? 'button active' : 'button'}
          index='3'
            >Edit profile</button>
        <button 
          onClick={e => Click(e)}
          className={activeMessage ? 'button active' : 'button'}
          index='4'
            >Message to admin</button>
      </div>
      <hr/>
      <div className='user_main'>
        <SwitchTransition>
          <CSSTransition
            timeout={250}
            classNames='fade'
            key={history.location.key}
          >
            <Switch location={history.location}>
              <Route exact path='/user/search'
                component={()=>
                  <SearchResult 
                    CarItem={CarItem}
                    searchResult={searchResult}
                    exact
                  />}
              />
              <Route exact path='/user/cars' component={UserCars}/>
              <Route path='/user/addcar' component={AddCarForm}/>
              <Route path='/user/profile' component={UserProfile}/>
              <Route path='/user/:carId'
                component={({match})=><ShowCar id={match.params.carId}/>}
              />
              <Route path='/:notFound' component={PageNotFound}/>
              
            </Switch>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}

export default BasicUserPage;