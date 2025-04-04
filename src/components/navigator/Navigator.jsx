import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../../ui/begin/Login';
import Register from '../../ui/begin/Register';
import ForgotPass from '../../ui/begin/ForgotPass';
import VerifyCode from '../../ui/begin/Verify';
import NewPass from '../../ui/begin/NewPass';

import Home from '../../ui/main/user/Home';
import HomeAdmin from '../../ui/main/admin/Home';

import ListStation from '../../ui/main/admin/list/ListStation';
import ListAddress from '../../ui/main/admin/list/ListAddress';
import ListBrandCar from '../../ui/main/admin/list/ListBrandCar';
import ListBrandStation from '../../ui/main/admin/list/ListBrandStation';
import ListPort from '../../ui/main/admin/list/ListPort';
import ListService from '../../ui/main/admin/list/ListService';
import ListVehicle from '../../ui/main/admin/list/ListVehicle';

import FormStation from '../../ui/main/admin/form/FormStation';
import FormAddress from '../../ui/main/admin/form/FormAddress';
import FormBrandCar from '../../ui/main/admin/form/FormBrandCar';
import FormBrandStation from '../../ui/main/admin/form/FormBrandStation';
import FormPort from '../../ui/main/admin/form/FormPort';
import FormService from '../../ui/main/admin/form/FormService';
import FormVehicle from '../../ui/main/admin/form/FormVehicle';

import Test from '../../ui/test/Test';
import Test2 from '../../ui/test/Test2';

import Error404 from '../../ui/main/Error404';
import TestByLoc from '../../ui/test/locdaynha//TestByLoc';

const Navigator = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgotPass' element={<ForgotPass />} />
            <Route path='/verify' element={<VerifyCode />} />
            <Route path='/newPass' element={<NewPass />} />

            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />

            <Route path='/admin/home' element={<HomeAdmin />} />

            <Route path='/test' element={<Test />} />
            <Route path='/loctest' element={<TestByLoc />} />
            <Route path='/test2' element={<Test2 />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

const Auth = ({ children }) => {
    const dataUser = JSON.parse(localStorage.getItem('user'));
    return dataUser ? children : <Navigate to='/login' />;
}

export default Navigator;