import React, { useState } from 'react';
import Loading from '../../../components/item/Loading';
import Sidebar from '../../../components/sidebar/SideBar';
import ListStation from './list/ListStation';
import ListBrandCar from './list/ListBrandCar';
import ListBrandStation from './list/ListBrandStation';
import ListService from './list/ListService';
import ListAddress from './list/ListAddress';
import ListVehicle from './list/ListVehicle';
import FormStation from './form/FormStation';
import FormBrandCar from './form/FormBrandCar';
import FormBrandStation from './form/FormBrandStation';
import FormPort from './form/FormPort';
import FormService from './form/FormService';
import FormAddress from './form/FormAddress';
import FormVehicle from './form/FormVehicle';
import ListPort from './list/ListPort';

const Home = () => {
    const [numberList, setNumberList] = useState(1);
    return (
        <div className="grid grid-cols-[16rem_1fr] min-h-screen">
            <Sidebar setNumberL={setNumberList} />
            {/* list */}
            {numberList == 1 ? <ListStation /> : null}
            {numberList == 2 ? <ListBrandCar /> : null}
            {numberList == 3 ? <ListBrandStation /> : null}
            {numberList == 4 ? <ListPort /> : null}
            {numberList == 5 ? <ListService /> : null}
            {numberList == 6 ? <ListAddress /> : null}
            {numberList == 7 ? <ListVehicle /> : null}
            {/* form */}
            {numberList == 8 ? <FormStation /> : null}
            {numberList == 9 ? <FormBrandCar /> : null}
            {numberList == 10 ? <FormBrandStation /> : null}
            {numberList == 11 ? <FormPort /> : null}
            {numberList == 12 ? <FormService /> : null}
            {numberList == 13 ? <FormAddress /> : null}
            {numberList == 14 ? <FormVehicle /> : null}

        </div>

    )
}

export default Home