import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import TextInputText from '../textinput/Text'
import TextInputFile from '../textinput/File'
import Button from '../button/Button'
import NotificationAlert from '../alert/NotificationAlert';
import Loading from '../item/Loading';
import AxiosInstance from '../util/AxiosInstance';
import { firebase } from '../../../config';



const FormBasicVehicle = (props) => {


    const { urlAddData, dataName, LogData } = props;

    const navigate = useNavigate();

    const [alert, setAlert] = useState(null);
    const [name, setName] = useState(null);
    const [isValidation, setIsValidation] = useState(null);

    const [checkValidationName, setCheckValidationName] = useState(false);
    const [checkLoading, setCheckLoading] = useState(false);
    const [preview, setPreview] = useState(null);


    const addData = async () => {
        try {
            setCheckLoading(true);

            const response = await AxiosInstance().post(urlAddData, {
                name: name,
            });

            if (response) {
                setCheckLoading(false);
                showToast('success', 'Thêm dữ liệu thành công');
                console.log('success', 'Thêm dữ liệu thành công');
            } else {
                setCheckLoading(false);
                showToast('error', 'Thêm dữ liệu thất bại');
            }

        } catch (error) {
            setCheckLoading(false);
            showToast('error', 'Lỗi không xác định');
            console.error(error);
        }
    };

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

    useEffect(() => {
        if (isValidation === true) {
            LogData();

            setTimeout(() => {
                setName(null);
                setPreview(null);
                setIsValidation(null);
            }, 100);
        }
    }, [isValidation]);



    const validation = async () => {

        let isValid = true;

        if (!name || name.trim().length === 0) {
            setCheckValidationName(true);
            showToast('error', 'Không được bỏ trống tên');
            isValid = false;
        } else {
            setCheckValidationName(false);
        }

        if (!isValid) {
            setIsValidation(false);
            return;
        }
        addData();
        setIsValidation(true);
        setAlert(null);
    }

    useEffect(() => {
        dataName(name);
    }, [name]);

    return (
        <div>
            {checkLoading ? <Loading /> :
                <div className='flex justify-center items-center min-h-screen p-4 dark:bg-gray-900'>
                    <div className='flex bg-white rounded-lg overflow-hidden w-full max-w-3xl relative p-8 flex-col items-center dark:bg-gray-700 dark:text-white'>
                        <h1 className='text-2xl font-semibold mb-6'>{props.title}</h1>
                        <TextInputText title='Tên' value={name || ''} placeholder={props.placeholder} onChange={e => setName(e.target.value)} checkValidation={checkValidationName} />
                        <Button title='Xác nhận' onClick={validation} />
                        {alert ? <NotificationAlert type={alert.type} message={alert.message} onClose={hideAlert} /> : null}

                    </div>
                </div>
            }
        </div>

    )
}

export default FormBasicVehicle