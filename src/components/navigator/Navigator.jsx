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
import ListBrandStation from '../../ui/main/admin/list/ListBrandStation';
import ListPort from '../../ui/main/admin/list/ListPort';
import ListService from '../../ui/main/admin/list/ListService';
import ListVehicle from '../../ui/main/admin/list/ListVehicle';

import FormAddress from '../../ui/main/admin/form/FormAddress';

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
            <Route path='/listaddress' element={<ListAddress />} />
            <Route path='/listbrandcar' element={<ListBrandCar />} />
            <Route path='/listbrandstation' element={<ListBrandStation />} />
            <Route path='/listport' element={<ListPort />} />
            <Route path='/listservice' element={<ListService />} />
            <Route path='/listvehicle' element={<ListVehicle />} />

            <Route path='/formaddress' element={<FormAddress />} />

            <Route path='/test' element={<Test />} />
        </Routes>
    );
}

const Auth = ({ children }) => {
    const dataUser = JSON.parse(localStorage.getItem('user'));
    return dataUser ? children : <Navigate to='/login' />;
}

export default Navigator;