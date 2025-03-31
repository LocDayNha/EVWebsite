import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../../../components/util/AxiosInstance';
import Select from "react-select";
import Loading from '../../../../components/item/Loading';
import BrandCar from '../../../../components/list/brandcar';

const ListBrandCar = () => {

    
    return (
        <div className='drak:p-4 dark:bg-gray-900 '>
            <BrandCar />
        </div >
    );
}
export default ListBrandCar