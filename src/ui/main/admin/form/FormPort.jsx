import React, { useState, useEffect } from 'react'
import Port from '../../../../components/form/Port';

const FormPort = () => {

    const [dataName, setDataName] = useState(null);
    const [dataElectric, setElectric] = useState(null);
    const [dataImage, setDataImage] = useState(null);

    const LogData = async () => {
        console.log('name:', dataName);
        console.log('electric:', dataElectric);
        console.log('image:', dataImage);
        setDataName(null);
        setDataImage(null);
        setElectric(null);
    }

    return (
        <div className='w-full'>
            <Port
                title='Cổng sạc'
                placeholder='Tên cổng sạc'
                dataName={setDataName}
                dataElectric={setElectric}
                dataImage={setDataImage}
                LogData={LogData}
            />
        </div>
    );
};

export default FormPort;