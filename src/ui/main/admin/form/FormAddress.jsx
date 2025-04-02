import React, { useState } from 'react'
import FormBasicVerOne from '../../../../components/form/VerOne';
import AxiosInstance from '../../../../components/util/AxiosInstance';

const FormAddress = () => {

    const [dataName, setDataName] = useState(null);
    const [dataImage, setDataImage] = useState(null);

    const LogData = async () => {
        console.log('name:', dataName);
        console.log('image:', dataImage);
        setDataName(null);
        setDataImage(null);
    }

    return (
        <div className='w-full'>
            <FormBasicVerOne
                urlAddData='/location/addNew'
                title='Nơi đặt trạm sạc'
                placeholder='Nơi đặt trạm sạc'
                dataName={setDataName}
                dataImage={setDataImage}
                LogData={LogData} />
        </div>
    );
};

export default FormAddress;