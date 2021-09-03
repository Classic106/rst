import React, { useState, useEffect } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import AddAdminUser from './AddAdminUser';
import NewCarsList  from './NewCarsList';
import UsersList from './UsersList';
import EditCarItem from './EditCarItem';
import PageNotFound from './PageNotFound';

import '../style/user.scss';

const AdminUserPage = ()=>{

  const history = useHistory();
  const dispatch = useDispatch();

  const locationState = history.location.state;

  const { user } = useSelector(store => store.user);

  const [buttonIndex, setButtonIndex] = useState(0);
  const [activeNewCars, setActiveNewCars] = useState(false);
  const [activeUsers, setActiveUsers] = useState(false);
  const [activeAdd, setActiveAdd] = useState(false);
  const [activeMessage, setActiveMessage] = useState(false);
  
  useEffect(()=>{
    setButtonIndex(locationState === undefined ? 0 : locationState);
  }, [locationState]);
  
  useEffect(()=>{
    buttonIndex === 0 ? setActiveNewCars(true) : setActiveNewCars(false);
    buttonIndex === 1 ? setActiveUsers(true) : setActiveUsers(false);
    buttonIndex === 2 ? setActiveAdd(true) : setActiveAdd(false);
    buttonIndex === 3 ? setActiveMessage(true) : setActiveMessage(false);
  }, [buttonIndex]);
  
  const Click = e =>{
    const index = +e.target.attributes[1].value;
    setButtonIndex(index);
    return index;
  }

  if(!user && !user.isAdim) {
    history.replace('/');
    return;
  }

  return (
    <div className='user'>
      <div className='user_header'>
        <button
          onClick={e => history.push("/admin/newcars", Click(e))}
          className={activeNewCars ? 'button active' : 'button'}
          index='0'
            >New cars</button>
        <button
          onClick={e => history.push("/admin/users", Click(e))}
          className={activeUsers ? 'button active' : 'button'}
          index='1'
            >Users</button>
        <button
          onClick={e => history.push("/admin/add", Click(e))}
          className={activeAdd ? 'button active' : 'button'}
          index='2'
            >Add admin</button>
        <button
          onClick={()=>{}}
          className='button'
          index='3'
            >Messages</button>
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
              <Route exact path='/admin/newcars'component={NewCarsList} />
              <Route exact path='/admin/users' component={UsersList}/>
              <Route exact path='/admin/add' component={AddAdminUser}/>
              <Route path='/admin/user/cars/:userId'
                component={({match})=><UserCars id={match.params.userId}/>}
              />
              <Route path='/:notFound' component={PageNotFound}/>
            </Switch>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}

export default AdminUserPage;

const UserCars = ({ id })=>{

  const [cars, setCars] = useState([]);
  
  const { searchResult } = useSelector(store => store.search);

  useEffect(()=>{
    for(let key in searchResult){
      if(searchResult[key]._id === id) setCars(searchResult[key].carsId);
    }
  }, [id, searchResult]);

  return(
    <div className='user_cars'>
      {
          cars.length === 0 ?
            <span className='empty'>Empty</span> :
                cars.map(car => <EditCarItem car={car} key={car._id}/>)
      }
    </div>
  )
}