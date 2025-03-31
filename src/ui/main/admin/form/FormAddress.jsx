import React, { useState, useEffect } from 'react'
import FormBasicVerOne from '../../../../components/form/VerOne';
import AxiosInstance from '../../../../components/util/AxiosInstance';

const FormAddress = () => {

    const [dataName, setDataName] = useState(null);
    const [dataImage, setDataImage] = useState(null);
    const [validationStatus, setValidationStatus] = useState(null);

    const LogData = () => {
        console.log('name:', dataName);
        console.log('image:', dataImage);
        console.log('validation status:', validationStatus);
    }

    useEffect(() => {
        if (validationStatus === true) {
            LogData();
        }
    }, [validationStatus]);


    return (
        <div className='w-full'>
            <FormBasicVerOne
                title='Nơi đặt trạm sạc'
                placeholder='Nơi đặt trạm sạc'
                dataName={setDataName}
                dataImage={setDataImage}
                validationStatus={setValidationStatus} />
        </div>
    );
};

export default FormAddress;