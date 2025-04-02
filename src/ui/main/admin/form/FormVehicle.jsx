import React, { useState, useEffect } from 'react'
import FormBasicVerOne from '../../../../components/form/VerOne';
import AxiosInstance from '../../../../components/util/AxiosInstance';
import FormBasicVehicle from '../../../../components/form/Vehicle';

const FormVehicle = () => {

    const [dataName, setDataName] = useState(null);

    const LogData = async () => {
        console.log('name:', dataName);
        setDataName(null);
    }

    return (
        <div className='w-full'>
            <FormBasicVehicle
                urlAddData='/vehicle/addNew'
                title='Loại phương tiện'
                placeholder='Tên loại phương tiện'
                dataName={setDataName}
                LogData={LogData} />
        </div>
    );
};

export default FormVehicle;