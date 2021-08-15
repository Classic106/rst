import Logo from '../images/rst-ua-logo.svg';

import { useSelector, useDispatch } from "react-redux";

const Header = ()=>{

  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);
 
  const Exit = ()=>{
    sessionStorage.removeItem('token');
    dispatch({type: 'REMOVE_USER'});
  };
  
  const Modal = val => dispatch({type: "OPEN_MODAL", payload: val});

  return (
    <div className="header_container">
      <img src={Logo} alt="alt" className='logo'/>
      <p>
        <span>Авто базар – Авторынок Украины.</span>
        <span>Автопродажа на RST это более 400000 б.у. авто,</span>
        <span>а также продажа новых автомобилей в Украине.</span>
        <span>Машины продают на сайте RST.</span>
      </p>
      <div>{user ? <button onClick={Exit} className='button'>Exit</button> :
        <div className='header_buttons'>
            <button onClick={()=>Modal("enter")} className='button'>Enter</button>
            <button onClick={()=>Modal("register")} className='button'>Register</button>
          </div>
        }
      </div>
    </div>
  );
};

export default Header;
