import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import logo from './logo.svg';
import "./App.scss";
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import FullscreenImages from './components/FullscreenImages';

const axios = require('axios').default;

function App() {

  const { user } = useSelector(store => store.user);
  const { modal } = useSelector(store => store.modal);
  const { open } = useSelector(store => store.fullscreen);

  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();

  useEffect(()=>{
    const Func = async ()=>{

      let token = await sessionStorage.getItem('token');
      if(token) axios.defaults.headers.common['Authorization'] = token;

      if(!user){
        await axios.get('http://localhost:3001/users/auth')
        .then(user => dispatch({type: 'SET_USER', payload: user.data}))
        .catch(err => {
          //console.log(err.message);
          sessionStorage.removeItem('token');
        });  
      }
      setLoader(false);
    }
    Func();
  }, []);

  return (
    <div className='application'>
      <Header />
      <hr/>
      <Main loader={loader}/>
      <hr/>
      <Footer />
      {
        modal ? <Modal /> : ''
      }
      {
        open ? <FullscreenImages /> : ''
      }
    </div>
  );
}

export default App;
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
/*
const creatersCars = {
    Acura: {
      models: [],
    },
    Alfa Romeo: {
      models: [],
    },
    Audi: {
      models: [],
    },
    Bentley: {
      models: [],
    },
    BMW: {
      models: [],
    },
    BYD: {
      models: [],
    },
    Cadillac: {
      models: [],
    },
    Chery: {
      models: [],
    },
    Chevrolet: {
      models: [],
    },
    Chrysler: {
      models: [],
    },
    Citroen: {
      models: [],
    },
    Dacia: {
      models: [],
    },
    Dadi: {
      models: [],
    },
    Daewoo: {
      models: [],
    },
    DAF: {
      models: [],
    },
    Daihatsu: {
      models: [],
    },
    Dodge: {
      models: [],
    },
    Fiat: {
      models: [],
    },
    Ford: {
      models: [],
    },
    Geely: {
      models: [],
    },
    Great Wall: {
      models: [],
    },
    Honda: {
      models: [],
    },
    Hummer: {
      models: [],
    },
    Hyundai: {
      models: [],
    },
    Infiniti: {
      models: [],
    },
    Isuzu: {
      models: [],
    },
    Iveco: {
      models: [],
    },
    Jeep: {
      models: [],
    },
    Kia: {
      models: [],
    },
    Lamborghini: {
      models: [],
    },
    Lancia: {
      models: [],
    },
    Land Rover: {
      models: [],
    },
    Lexus: {
      models: [],
    },
    Man: {
      models: [],
    },
    Mazda: {
      models: [],
    },
    Mercedes: {
      models: [],
    },
    Mini: {
      models: [],
    },
    Mitsubishi: {
      models: [],
    },
    Nissan: {
      models: [],
    },
    Opel: {
      models: [],
    },
    Peugeot: {
      models: [],
    },
    Porsche: {
      models: [],
    },
    Renault: {
      models: [],
    },
    Rover: {
      models: [],
    },
    Saab: {
      models: [],
    },
    Samand: {
      models: [],
    },
    Seat: {
      models: [],
    },
    Skoda: {
      models: [],
    },
    SMA: {
      models: [],
    },
    Smart: {
      models: [],
    },
    Ssangyong: {
      models: [],
    },
    Subaru: {
      models: [],
    },
    Suzuki: {
      models: [],
    },
    Toyota: {
      models: [],
    },
    Volkswagen: {
      models: [],
    },
    Volvo: {
      models: [],
    },
    Богдан: {
      models: [],
    },
    ВАЗ: {
      models: [],
    },
    ГАЗ: {
      models: [],
    },
    ЗАЗ: {
      models: [],
    },
    ЗИЛ: {
      models: [],
    },
    КАМАЗ: {
      models: [],
    },
    КРАЗ: {
      models: [],
    },
    МАЗ: {
      models: [],
    },
    Москвич: {
      models: [],
    },
    Мото: {
      models: [],
    },
    Прицеп: {
      models: [],
    },
    Спецтехника: {
      models: [],
    },
    УАЗ: {
      models: [],
    },
    Урал: {
      models: [],
    },
}
*/