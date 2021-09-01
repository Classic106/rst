import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import EnterForm from './EnterForm';
import RegistrationForm from './RegistrationForm';

import '../style/modal&fullscreen.scss';

const Modal = () => {

    const dispatch = useDispatch();
    const { modal } = useSelector(store => store.modal);
    
    const CloseModal = e =>{
        if(e.target.className === 'modal_page') dispatch({type: "CLOSE_MODAL"});
    }

    return (
        <div className='modal_page' onClick={CloseModal}>
           {
            (()=>{
                switch(modal){
                    
                    case 'enter':
                        return <EnterForm />;

                    case 'register':
                        return <RegistrationForm />;

                    default: 
                        return '';
                }
            })()
           }
        </div>)
}

export default Modal;