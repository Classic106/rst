import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import { ValidMail, ValidPassword, ValidString } from '../helpers';

import '../style/enter_form.scss';

const axios = require('axios').default;

const EnterForm = () => {
    
    const dispatch = useDispatch();
    
    const [validLogin, setValidLogin] = useState(true);
    const [validPass, setValidPass] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(()=>{
        setDisabled(!(validLogin && validPass))
    }, [validLogin, validPass])

    const Check = e =>{
        
        const { name, value }= e.target;
        
        if(name === 'password') setValidPass(ValidPassword(value));
        else if(name === 'login'){
            const valid = (value.includes('@')) ? ValidMail(value) : ValidString(value);
            setValidLogin(valid);
        }
    }
    
    const Submit = e =>{
        
        e.preventDefault();
        
        const { login, password } = e.target;
        
        if(login.value === '' && password.value === ''){
            alert('Fill form!!!');
            return;
        }else if(login.value === ''){
            alert('Enter login or email!!!');
            return;
        }else if(password.value === ''){
            alert('Enter password!!!');
            return;
        }

        const user = { 
            login: login.value,
            password: password.value
        }
        
        axios.post(`http://localhost:3001/users/auth`, user)
        .then(user => {
            sessionStorage.setItem('token', user.headers.authorization);
            axios.defaults.headers.common['authorization'] = user.headers.authorization;
            dispatch({type: 'SET_USER', payload: user.data});
            dispatch({type: 'CLOSE_MODAL'});
        })
        .catch(err => {
            setError(true);
            //console.log(err.message);
        });
    
    }

    return (
        <form className="enter_form" onSubmit={Submit}>
            <h3>Enter form</h3>
            <label>
                {
                    (error) ? 'Wrong Login or Password' : ''
                }
            </label>
            <label>
                <input
                    className={validLogin ? "login" : "login invalid"}
                    type="text"
                    name="login"
                    onChange={Check}
                    placeholder="Enter Login or Email"
                />
            </label>
            <label>
                <input
                    className={validPass ? "password" :  "password invalid"}
                    type="password"
                    name="password"
                    onChange={Check}
                    placeholder="Enter password"
                />
            </label>
            <label></label>
            <button
                className="enter_button button"
                type='submit'
                disabled={disabled}
            >Enter
            </button>
        </form>
    );
}

export default EnterForm;