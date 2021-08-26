import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Redirect } from 'react-router-dom';

import BasicUserPage from './BasicUserPage';
import AdminUserPage from './AdminUserPage';

const User = ()=>{

    const { user } = useSelector(store => store.user);
    
    return user.isAdmin ? <AdminUserPage /> : <BasicUserPage />;
    //return <AdminUserPage />
}

export default User;