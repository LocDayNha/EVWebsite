import React, { useState, useEffect } from 'react'
import FormBasicVerOne from '../../../../components/form/VerOne';
import AxiosInstance from '../../../../components/util/AxiosInstance';

const FormService = () => {

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
                title='Dịch vụ'
                placeholder='Tên dịch vụ'
                dataName={setDataName}
                dataImage={setDataImage}
                LogData={LogData} />
        </div>
    );
};

export default FormService;