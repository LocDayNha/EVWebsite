import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../../ui/begin/Login';
import Register from '../../ui/begin/Register';
import ForgotPass from '../../ui/begin/ForgotPass';
import VerifyCode from '../../ui/begin/Verify';
import NewPass from '../../ui/begin/NewPass';
import Home from '../../ui/main/user/Home';
import Test from '../../ui/test/Test';

import ListStation from '../../ui/main/admin/list/ListStation';

import ListAddress from '../../ui/main/admin/list/ListAddress';
import ListBrandCar from '../../ui/main/admin/list/ListBrandCar';

import ListPart1 from '../../ui/main/admin/ListPart1';

const Navigator = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgotPass' element={<ForgotPass />} />
            <Route path='/verify' element={<VerifyCode />} />
            <Route path='/newPass' element={<NewPass />} />

            <Route path='/liststation' element={<ListStation />} />

            <Route path='/listpart1' element={<ListPart1 />} />

            <Route path='/listaddress' element={<ListAddress />} />
            <Route path='/listbrandcar' element={<ListBrandCar />} />

            <Route path='/test' element={<Test />} />
        </Routes>
    );
}

const Auth = ({ children }) => {
    const dataUser = JSON.parse(localStorage.getItem('user'));
    return dataUser ? children : <Navigate to='/login' />;
}

export default Navigator;