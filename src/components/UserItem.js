import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { ValidString, ValidMail, ValidPhone } from '../helpers';

import '../style/user_item.scss';

const axios = require('axios').default;

const UserItem = ({ user }) => {
    
    const dispatch = useDispatch();
    const history = useHistory();
    
    const { searchResult } = useSelector(store => store.search);

    const [validLogin, setValidLogin] = useState(true);
    const [validName, setValidName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPhone, setValidPhone] = useState(true);
    const [validAdditionalPhone, setValidAdditionalPhone] = useState(true);

    const [loginClass, setLoginClass] = useState(0);
    const [nameClass, setNameClass] = useState(0);
    const [emailClass, setEmailClass] = useState(0);
    const [phoneClass, setPhoneClass] = useState(0);
    const [additionalPhoneClass, setAdditionalPhoneClass] = useState(0);

    const [login, setLogin] = useState(user.login || '');
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [additionalPhone, setAdditionalPhone] = useState(user.additionalPhone || '');
    const [admin, setAdmin] = useState(user.isAdmin || false);
    const deleted = user.isDeleted || false;

    const [disabled, setDisabled] = useState(false);
    
    useEffect(()=>{
        (
            validLogin && validName && validEmail &&
            validPhone && validAdditionalPhone 
        ) ? setDisabled(false) : setDisabled(true);
    }, [
        validLogin, validName, validEmail,
        validPhone, validAdditionalPhone,
        setDisabled
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

    const Submit= e =>{
        e.preventDefault();

        const obj = {};

        if(login !== user.login) obj.login = login;
        if(name !== user.name) obj.name = name;
        if(email !== user.email) obj.email = email;
        if(phone !== user.phone) obj.phone = phone;
        if(additionalPhone !== user.additionalPhone) obj.additionalPhone = additionalPhone;
        if(admin !== user.isAdmin) obj.isAdmin = admin;
        if(deleted !== user.isDeleted) obj.isDeleted = deleted;

        if(Object.keys(obj).length > 0){
            axios.patch('http://localhost:3001/users/'+user._id, obj)
            .then(result => {
                //console.log(searchResult);
                const newSearchResult = [...searchResult].map(item =>{
                    if(item._id === result.data._id) return result.data;
                    else return item;
                });
                //console.log(newSearchResult);
                dispatch({type: 'SET_SEARCH_RESULT', payload: newSearchResult});
                alert('Changes saved!!!');
            });
        }else alert('Nothing change!!!');
    }
    
    const Repair = ()=>{
        
        const obj = {
            isDeleted: false,
            date: Date.now(),
            deleteDate: 0,
        };

        axios.patch('http://localhost:3001/users/'+user._id, obj)
            .then(result => {
                
                const newSearchResult = [...searchResult].map(item =>{
                    if(item._id === result.data._id) return result.data;
                    else return item;
                });

                dispatch({type: 'SET_SEARCH_RESULT', payload: newSearchResult});
                alert('User repaired!!!');
            });
    }

    const Delete = ()=>{
        axios.delete('http://localhost:3001/users/'+user._id)
            .then(result => {
                dispatch({type: 'SET_SEARCH_RESULT', payload: result.data});
                alert('User deleted!!!');
            });
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

    return(
         <form onSubmit={Submit} className={(()=>{
            if(admin) return 'user_item admin';
            if(user.isDeleted) return 'user_item deleted';
            return 'user_item'; 
         })()}>
                <label>
                    Login
                    <input
                        className={(()=>{
                            if(loginClass === 0) return "login";
                            if(loginClass === -1) return "login invalid";
                            if(loginClass === 1) return "login valid";
                        })()}
                        type="text"
                        name="login"
                        value={login}
                        onChange={SetItem}
                    />
                </label>
                <label>
                    Name
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
                    Email
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
                    Phone
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
                    Additonal phone
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
                <label className='user_date'>
                    <span>Registered {new Date(user.date).toLocaleString('ru-RU')}</span>
                    {
                        user.deleteDate > 0 ?
                            <span>
                                `deleted ${
                                    new Date(user.deleteDate).toLocaleString('ru-RU')
                                }`
                            </span> : ''
                    }
                </label>
                 <label className='checkbox_admin'>
                    <input
                        type="checkbox" name='admin'
                        checked={admin} onChange={()=>setAdmin(!admin)}
                    />
                    Admin
                </label>

                <div className='user_item_buttons'>
                    <button
                        type='submit'
                        className='button'
                        disabled={disabled}
                    >Update</button>
                    <button
                        type='button'
                        className='button'
                        disabled={disabled}
                        onClick={()=> history.push("/admin/user/cars/"+user._id)}
                    >Cars</button>
                    <button
                        type='button'
                        className='button delete'
                        disabled={disabled}
                        onClick={Delete}
                    >DELETE</button>
                    {
                        user.isDeleted ? 
                            <button
                                type='button'
                                className='button'
                                disabled={disabled}
                                onClick={Repair}
                            >Repair</button> : ''
                    }
                </div>
            </form>
    )
}

export default UserItem;
