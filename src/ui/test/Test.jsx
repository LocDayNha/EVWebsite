import React, { useState, useEffect } from 'react'
import Port from '../../components/form/Port';

const Test = () => {

    return (
        <div className='w-full'>
            <Port
                title='Cổng sạc'
                placeholder='Nơi đặt trạm sạc'
            />
        </div>
    );
};

export default Test;