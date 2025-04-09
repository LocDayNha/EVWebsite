import React, { useState } from 'react';
import Loading from '../../../components/item/Loading';
import Footer from '../../../components/sidebar/Footer';
import Filter from '../../../components/list/Filter';

const Home = () => {
    return (

        <div>
            <div className='flex flex-row'>
                <div className='w-3/10'>
                    <Filter />
                </div>
                <div className='w-7/10 bg-amber-400'>
                    <Loading />
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div>

    )
}

export default Home