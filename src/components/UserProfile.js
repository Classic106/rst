import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ValidString, ValidMail, ValidPassword, ValidPhone } from '../helpers';

import '../style/user_profile.scss';

const axios = require('axios').default;

const UserProfile = ()=>{
    
    const dispatch = useDispatch();
    
    const { user } = useSelector(store => store.user);

    const [validName, setValidName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPhone, setValidPhone] = useState(true);
    const [validAdditionalPhone, setValidAdditionalPhone] = useState(true);
    const [validPass, setValidPass] = useState(true);
    const [validConfirmPass, setValidConfirmPass] = useState(true);

    const [nameClass, setNameClass] = useState(0);
    const [emailClass, setEmailClass] = useState(0);
    const [phoneClass, setPhoneClass] = useState(0);
    const [additionalPhoneClass, setAdditionalPhoneClass] = useState(0);
    const [passClass, setPassClass] = useState(0);
    const [confirmPassClass, setConfirmPassClass] = useState(0);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [additionalPhone, setAdditionalPhone] = useState(user.additionalPhone);
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [openPass, setopenPass] = useState(false);

    useEffect(()=>{
        (
            validName || validEmail || validPhone ||
            validAdditionalPhone || validPass || validConfirmPass
        ) ? setDisabled(false) : setDisabled(true);
    }, [
        validName, validEmail, validPhone,
        validAdditionalPhone, validPass, validConfirmPass
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
        
        if(pass){
            if(validPass && validConfirmPass) obj.password = pass;
            else return;
        }
        
        for(let k = 0; k < e.target.length-2; k++){
            
            if(e.target[k].name === 'password'){
                if(e.target[k].value !== '')
                    obj[e.target[k].name] = e.target[k].value;
            }
            else obj[e.target[k].name] = e.target[k].value;
        }
        
        axios.patch(`http://localhost:3001/users/`+user._id, obj)
        .then(user => {
            dispatch({type: 'SET_USER', payload: user.data});
            pass ? alert('Password changed!!!') : alert('Changes saved!!!');
        })
        .catch(err => {
            //console.log(err.message);
        });
    }

    const Check = e =>{
        
        const { name, value } = e.target;
        
        if(name === 'name') {
            setName(value);
            const valid = ValidString(value);
            valid ? setNameClass(0) : setNameClass(-1);
            setValidName(valid);
        }
        if(name === 'email'){
            setEmail(value);
            const valid = ValidMail(value);
            valid ? setEmailClass(0) : setEmailClass(-1);
            setValidEmail(valid);
        }
        if(name === 'phone'){
            setPhone(value);
            const valid = ValidPhone(value);
            valid ? setPhoneClass(0) : setPhoneClass(-1);
            setValidPhone(valid);
        }
        if(name === 'additionalPhone'){
            setAdditionalPhone(value);
            const valid = ValidPhone(value);
            valid ? setAdditionalPhoneClass(0) : setAdditionalPhoneClass(-1);
            setValidAdditionalPhone(valid);
        }
    }
    
    return(
        <div className='user_profile'>
            <form onSubmit={Submit}>
                <h3>Change your profile</h3>
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
                        onChange={Check}
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
                        onChange={Check}
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
                        onChange={Check}
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
                        onChange={Check}
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

                <button
                    type='submit'
                    className='button'
                    disabled={disabled}
                >Edit</button>
            </form>
        </div>)
}

export default UserProfile;

/*
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
*/
