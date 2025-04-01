import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import TextInputText from '../textinput/Text'
import TextInputFile from '../textinput/File'
import Button from '../button/Button'
import NotificationAlert from '../alert/NotificationAlert';
import Radio from '../dropdown/Radio';
import Specification from './Specification';

const Station = (props) => {

    const { dataName, dataImage, LogData } = props;

    const dataTypePort =
        [
            { "_id": "wq21e1dq11ed21wd1", "name": "Cây xăng" },
            { "_id": "12e1r1feaf11fasfd", "name": "Cây Mice" }
        ]

    return (
        <div className='flex justify-center items-center min-h-screen p-4 dark:bg-gray-900'>
            <div className='flex bg-white rounded-lg overflow-hidden w-full max-w-3xl relative p-8 flex-col items-center dark:bg-gray-700 dark:text-white'>
                <h1 className='text-2xl font-semibold mb-6'>{props.title}</h1>

                <TextInputText title='Tên trạm sạc' placeholder='Nhập tên' />
                <TextInputText title='Địa chỉ trạm sạc' placeholder='Chọn địa chỉ' />
                <Radio data={dataTypePort} title='Nơi đặt trạm sạc' />
                <Radio data={dataTypePort} title='Hãng trụ sạc' />

                <Specification />

                <TextInputText title='Ghi chú' placeholder='Nhập ghi chú' />
                <TextInputFile title='Hình ảnh' />
                <Button title='Xác nhận' />

            </div>
        </div >
    )
}

export default Station