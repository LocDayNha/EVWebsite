import React, { useState } from 'react';
import Loading from '../../../components/item/Loading';
import Sidebar from '../../../components/sidebar/SideBar';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Sidebar />
            <Loading />
        </div>

    )
}

export default Home