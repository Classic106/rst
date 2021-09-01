import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ValidString, ValidMail, ValidPassword, ValidPhone } from '../helpers';

import '../style/user_profile.scss';

const axios = require('axios').default;

const UserProfile = ()=>{
    
    const dispatch = useDispatch();
    const history = useHistory();

    const { user } = useSelector(store => store.user);

    const [validLogin, setValidLogin] = useState(true);
    const [validName, setValidName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPhone, setValidPhone] = useState(true);
    const [validAdditionalPhone, setValidAdditionalPhone] = useState(true);
    const [validPass, setValidPass] = useState(true);
    const [validConfirmPass, setValidConfirmPass] = useState(true);

    const [loginClass, setLoginClass] = useState(0);
    const [nameClass, setNameClass] = useState(0);
    const [emailClass, setEmailClass] = useState(0);
    const [phoneClass, setPhoneClass] = useState(0);
    const [additionalPhoneClass, setAdditionalPhoneClass] = useState(0);
    const [passClass, setPassClass] = useState(0);
    const [confirmPassClass, setConfirmPassClass] = useState(0);

    const [login, setLogin] = useState(user.login || '');
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [additionalPhone, setAdditionalPhone] = useState(user.additionalPhone || '');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [openPass, setopenPass] = useState(false);
  
    useEffect(()=>{
        (
            validLogin && validName && validEmail && validPhone &&
            validAdditionalPhone && validPass && validConfirmPass
        ) ? setDisabled(false) : setDisabled(true);
    }, [
        validLogin, validName, validEmail, validPhone,
        validAdditionalPhone, validPass, validConfirmPass
    ]);
    
    useEffect(()=>{

       if(login === '') setLoginClass(0);
       else validLogin ? setLoginClass(1) : setLoginClass(-1); 

        if(name === '') setNameClass(0);
        else validName ? setNameClass(1) : setNameClass(-1);

        if(email === '') setEmailClass(0);
        else validEmail ? setEmailClass(1) : setEmailClass(-1);

        if(phone === '') setPhoneClass(0);
        else validPhone ? setPhoneClass(1) : setPhoneClass(-1);

        if(additionalPhone === '') setAdditionalPhoneClass(0);
        else validAdditionalPhone ?
            setAdditionalPhoneClass(1) : setAdditionalPhoneClass(-1);

    }, [
        login, validLogin, name, validName, email, validEmail,
        phone, validPhone, additionalPhone, validAdditionalPhone 
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

    const Submit = e =>{
        e.preventDefault();
        
        const obj = {};

        if(login !== user.login) obj.login = login;
        if(name !== user.name) obj.name = name;
        if(email !== user.email) obj.email = email;
        if(phone !== user.phone) obj.phone = phone;
        if(additionalPhone !== user.additionalPhone)
            obj.additionalPhone = additionalPhone;
        if(pass){
            if(validPass && validConfirmPass) obj.password = pass;
            else return;
        }
        
        if(Object.keys(obj).length > 0){
            axios.patch(`http://localhost:3001/users/`+user._id, obj)
            .then(user => {
                dispatch({type: 'SET_USER', payload: user.data});
                pass ? alert('Password changed!!!') : alert('Changes saved!!!');
            })
            .catch(err => {
                //console.log(err.message);
            });
        }else alert('Nothing change!!!');
    }

    const SetItem = e =>{
        
        const { name, value } = e.target;

        if(name === 'login') {
            setLogin(value);
            setValidLogin(ValidString(value));
        }
        if(name === 'name') {
            setName(value);
            setValidName(ValidString(value));
        }
        if(name === 'email'){
            setEmail(value);
            setValidEmail(ValidMail(value));
        }
        if(name === 'phone'){
            setPhone(value);
            setValidPhone(ValidPhone(value));
        }
        if(name === 'additionalPhone'){
            setAdditionalPhone(value);
            setValidAdditionalPhone(ValidPhone(value));
        }
    }

    const Delete = ()=>{
        axios.delete('http://localhost:3001/users/'+user._id)
            .then(result => {
                dispatch({type: 'SET_SEARCH_RESULT', payload: result.data});
                dispatch({type: 'REMOVE_USER'});
                delete axios.defaults.headers.common["authorization"];
                sessionStorage.removeItem('token');
                history.push('/search');
                alert('Account deleted!!!');
            });
    }

    return(
        <div className='user_profile'>
            <form onSubmit={Submit}>
                <h3>Change your profile</h3>
                <label>
                    Login:
                    <input
                        className={(()=>{
                            if(loginClass === 0) return "name";
                            if(loginClass === -1) return "name invalid";
                            if(loginClass === 1) return "name valid";
                        })()}
                        type="text"
                        name="login"
                        value={login}
                        onChange={SetItem}
                    />
                </label>
                <label>
                    Name:
                    <input
                        className={(()=>{
                            if(nameClass === 0) return "name";
                            if(nameClass === -1) return "name invalid";
                            if(nameClass === 1) return "name valid";
                        })()}
                        type="text"
                        name="name"
                        value={name}
                        onChange={SetItem}
                    />
                </label>
                <label>
                    Email:
                    <input
                        className={(()=>{
                            if(emailClass === 0) return "email";
                            if(emailClass === -1) return "email invalid";
                            if(emailClass === 1) return "email valid";
                        })()}
                        type="text"
                        name="email"
                        value={email}
                        onChange={SetItem}
                    />
                </label>
                <label>
                    Phone:
                    <input
                        className={(()=>{
                            if(phoneClass === 0) return "phone";
                            if(phoneClass === -1) return "phone invalid";
                            if(phoneClass === 1) return "phone valid";
                        })()}
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={SetItem}
                    />
                </label>
                <label>
                    Additonal phone:
                    <input
                        className={(()=>{
                            if(additionalPhoneClass === 0) return "phone";
                            if(additionalPhoneClass === -1) return "phone invalid";
                            if(additionalPhoneClass === 1) return "phone valid";
                        })()}
                        type="text"
                        name="additionalPhone"
                        value={additionalPhone}
                        onChange={SetItem}
                    />
                </label>
                <button
                    type='button'
                    className='additional_settings_button'
                    onClick={()=>setopenPass(!openPass)}
                >
                    Change password
                </button>

                {openPass ? <>
                    <label>
                        Password:
                        <input
                            className={(()=>{
                                if(passClass === 0) return "password";
                                if(passClass === -1) return "password invalid";
                                if(passClass === 1) return "password valid";
                            })()}
                            type="password"
                            name="password"
                            onChange={e => setPass(e.target.value)}
                        />
                    </label>
                    <label>
                        Confirm password:
                        <input
                            className={(()=>{
                                if(confirmPassClass === 0) return "password";
                                if(confirmPassClass === -1) return "password invalid";
                                if(confirmPassClass === 1) return "password valid";
                            })()}
                            type="password"
                            name="confirmPassword"
                            onChange={e => setConfirmPass(e.target.value)}
                        />
                    </label>
                </> : ''}
                <div className='profile_buttons'>
                    <button
                        type='button'
                        className='button delete'
                        disabled={disabled}
                        onClick={Delete}
                    >DELETE PROFILE</button>
                    <button
                        type='submit'
                        className='button'
                        disabled={disabled}
                    >Edit</button>
                </div>
            </form>
        </div>)
}

export default UserProfile;