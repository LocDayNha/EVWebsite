import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import TextInputText from '../textinput/Text'
import TextInputFile from '../textinput/File'
import Button from '../button/Button'
import NotificationAlert from '../alert/NotificationAlert';
import Radio from '../dropdown/Radio';

const Port = (props) => {

    const dataTypePort =
        [
            { "_id": "wq21e1dq11ed21wd1", "name": "AC" },
            { "_id": "12e1r1feaf11fasfd", "name": "DC" }
        ]

    const navigate = useNavigate();

    const [alert, setAlert] = useState(null);
    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(null);

    const [checkValidationName, setCheckValidationName] = useState(false);
    const [checkValidationImage, setCheckValidationImage] = useState(false);
    const [checkValidationType, setCheckValidationType] = useState(false);

    const showToast = (type, message) => {

        if (alert?.timer) {
            clearTimeout(alert.timer);
        }

        const timer = setTimeout(() => {
            setAlert(null);
        }, 5000);

        setAlert({ type, message, timer });
    };

    const hideAlert = () => {
        if (alert?.timer) {
            clearTimeout(alert.timer);
        }

        setAlert(null);
    };

    const validation = async () => {

        let isValidation = true;

        if (!name || name.trim() <= 0) {
            setCheckValidationName(true);
            isValidation = false;
            showToast('error', 'Không được bỏ trống tên');
            return;
        } else {
            setCheckValidationName(false);
        }

        if (!type) {
            setCheckValidationType(true);
            isValidation = false;
            showToast('error', 'Không được bỏ trống dòng điện');
            return;
        } else {
            setCheckValidationType(false);
        }

        if (!image) {
            setCheckValidationImage(true);
            isValidation = false;
            showToast('error', 'Không được bỏ trống hình ảnh');
            return;
        } else {
            setCheckValidationImage(false);
            setAlert(null);
            return isValidation;
        }
    }

    const LogData = async () => {
        try {
            const isValidation = await validation();

            if (isValidation) {
                console.log('name:', name);
                console.log('type:', type.name);
                console.log('image:', image);
                window.location.reload();
            }
        } catch (error) {
            console.log('ERROR:', error);
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen p-4 dark:bg-gray-900'>
            <div className='flex bg-white rounded-lg overflow-hidden w-full max-w-3xl relative p-8 flex-col items-center dark:bg-gray-700 dark:text-white'>
                <h1 className='text-2xl font-semibold mb-6'>{props.title}</h1>

                <TextInputText title='Tên' placeholder={props.placeholder} onChange={e => setName(e.target.value)} checkValidation={checkValidationName} />
                <Radio data={dataTypePort} title='Dòng điện' selectedData={setType} checkValidation={checkValidationType} />
                <TextInputFile title='Hình ảnh' onChange={() => setImage('CO NHAN CHON HINH ANH')} checkValidation={checkValidationImage} />
                <Button title='Xác nhận' onClick={LogData} />
                {alert ? <NotificationAlert type={alert.type} message={alert.message} onClose={hideAlert} /> : null}
            </div>
        </div>
    )
}

export default Port