import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { ValidMail, ValidPassword, ValidString } from '../helpers';

const axios = require('axios').default;

const RegistrationForm = ()=>{
    
    const dispatch = useDispatch();
    const history = useHistory();

    const [validLogin, setValidLogin] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPass, setValidPass] = useState(true);
    const [validConfirmPass, setValidConfirmPass] = useState(true);

    const [loginClass, setLoginClass] = useState(0);
    const [emailClass, setEmailClass] = useState(0);
    const [passClass, setPassClass] = useState(0);
    const [confirmPassClass, setConfirmPassClass] = useState(0);

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [disabled, setDisabled] = useState(false);
    
    useEffect(()=>{
        if(
            (validLogin && validEmail && validPass && validConfirmPass) || 
            (login === '' && email === '' && pass === '' && confirmPass === '')
        )
            setDisabled(false);
        else setDisabled(true);
    }, [
        validLogin, validEmail, validPass,
        validConfirmPass, login, email, pass, confirmPass
    ]);

    useEffect(()=>{
        const valid = ValidPassword(pass);
            valid ? setPassClass(1) : setPassClass(-1);
        if(pass === '')setPassClass(0);
        else valid ? setPassClass(1) : setPassClass(-1);
        setValidPass(valid);
        
        setValidConfirmPass(confirmPass === pass);

        if(confirmPass === '') setConfirmPassClass(0);
        else confirmPass === pass ? setConfirmPassClass(1) : setConfirmPassClass(-1);
    
        if(validPass && validConfirmPass)
            setDisabled(false);
        else setDisabled(true);

    }, [validPass, validConfirmPass, pass, confirmPass]);

    useEffect(()=>{
       
        let timer = null;
        
        if(login !== '' || email  !== ''){
            
            timer = setTimeout(() => {
                const user = {
                    email: email,
                    login: login,
                }

                axios.post(`http://localhost:3001/users/check`, user)
                .then(result => {
                    if(result.data === 'both'){
                        setLoginClass(-1);
                        setEmailClass(-1);
                        setValidEmail(false);
                        setValidLogin(false);
                    }
                    if(result.data === 'email') {
                        setEmailClass(-1);
                        setValidEmail(false);
                    }
                    if(result.data === 'login') {
                        setLoginClass(-1);
                        setValidLogin(false);
                    }
                    if(result.data === true) {
                        if(validLogin && login !== '') setLoginClass(1);
                        if(validEmail && email  !== '') setEmailClass(1);
                    };
                })
                .catch(err => {
                    console.log(err.message);
                });
            }, 1000);
        }else{
            clearInterval(timer);
            timer = null;
        }
        
        return ()=>{
            clearTimeout(timer);
            timer = null;
        }
    }, [login, email, validEmail, validLogin]);

    const Check = e =>{
        
        const { name, value } = e.target;
        
        if(name === 'login') {
            setLogin(value);
            const valid = ValidString(value);
            valid ? setLoginClass(0) : setLoginClass(-1);
            setValidLogin(valid);
        }
        if(name === 'email'){
            setEmail(value);
            const valid = ValidMail(value);
            valid ? setEmailClass(0) : setEmailClass(-1);
            setValidEmail(valid);
        }
    }

    const Submit = e =>{
        
        e.preventDefault();
        
        const { login, email, password, confirmPassword } = e.target;
        
        if(login.value === '' && email === ''
            && password.value === '' && password.value === '')
        {
            alert('Fill form!!!');
            return;
        }else if(login.value === ''){
            alert('Enter login!!!');
            return;
        }else if(email.value === ''){
            alert('Enter email!!!');
            return;
        }else if(password.value === ''){
            alert('Enter password!!!');
            return;
        }else if(confirmPassword.value === ''){
            alert('Enter confirm password!!!');
            return;
        }

        const user = { 
            login: login.value,
            email: email.value,
            password: password.value,
        }
        
        axios.post(`http://localhost:3001/users/reg`, user)
        .then(user => {

            sessionStorage.setItem('token', user.headers.authorization);
            axios.defaults.headers.common['authorization'] = user.headers.authorization;
            dispatch({type: 'SET_USER', payload: user.data});
            dispatch({type: 'CLOSE_MODAL'});
            history.push('/user');
        })
        .catch(err => {
            //console.log(err.message);
        });
    }

    return (
        <form className="enter_form" onSubmit={Submit}>
            <h3>Registration form</h3>
            <label></label>
            <label>
                <input
                    className={(()=>{
                        if(loginClass === 0) return "login";
                        if(loginClass === -1) return "login invalid";
                        if(loginClass === 1) return "login valid";
                    })()}
                    type="text"
                    name="login"
                    onChange={Check}
                    placeholder="Enter Login"
                />
            </label>
            <label>
                <input
                    className={(()=>{
                        if(emailClass === 0) return "email";
                        if(emailClass === -1) return "email invalid";
                        if(emailClass === 1) return "email valid";
                    })()}
                    type="text"
                    name="email"
                    onChange={Check}
                    placeholder="Enter Email"
                />
            </label>
            <label>
                <input
                    className={(()=>{
                        if(passClass === 0) return "password";
                        if(passClass === -1) return "password invalid";
                        if(passClass === 1) return "password valid";
                    })()}
                    type="password"
                    name="password"
                    onChange={e => setPass(e.target.value)}
                    placeholder="Enter password"
                />
            </label>
            <label>
                <input
                    className={(()=>{
                        if(confirmPassClass === 0) return "password";
                        if(confirmPassClass === -1) return "password invalid";
                        if(confirmPassClass === 1) return "password valid";
                    })()}
                    type="password"
                    name="confirmPassword"
                    onChange={e => setConfirmPass(e.target.value)}
                    placeholder="Enter confirm password"
                />
            </label>
            <button
                className="enter_button button"
                type='submit'
                disabled={disabled}
            >Reistration
            </button>
        </form>
    );
}

export default RegistrationForm;