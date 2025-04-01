import React, { useState, useEffect } from 'react'
import Station from '../../../../components/form/Station';

const FormStation = () => {

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
            <Station
                title='Trạm sạc'
                dataName={setDataName}
                dataImage={setDataImage}
                LogData={LogData}
            />
        </div>
    )
}

export default FormStation