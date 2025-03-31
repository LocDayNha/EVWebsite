import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import TextInputText from '../textinput/Text'
import TextInputFile from '../textinput/File'
import Button from '../button/Button'
import NotificationAlert from '../alert/NotificationAlert';

const FormBasicVerOne = (props) => {


    const { dataName, dataImage, validationStatus } = props;

    const navigate = useNavigate();

    const [alert, setAlert] = useState(null);
    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);

    const [checkValidationName, setCheckValidationName] = useState(false);
    const [checkValidationImage, setCheckValidationImage] = useState(false);
    const [isValidation, setIsValidation] = useState(null);

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

        if (!name || name.trim() <= 0) {
            setCheckValidationName(true);
            setIsValidation(false);
            showToast('error', 'Không được bỏ trống tên');
            return;
        } else {
            setCheckValidationName(false);
        }

        if (!image) {
            setCheckValidationImage(true);
            setIsValidation(false);
            showToast('error', 'Không được bỏ trống hình ảnh');
            return;
        } else {
            setCheckValidationImage(false);
            setIsValidation(true);
            setAlert(null);
        }
    }

    useEffect(() => {
        dataName?.(name);
        dataImage?.(image);
        validationStatus?.(isValidation);
    }, [dataName, dataImage, validationStatus, name, image, isValidation]);

    return (
        <div className='flex justify-center items-center min-h-screen p-4 dark:bg-gray-900'>
            <div className='flex bg-white rounded-lg overflow-hidden w-full max-w-3xl relative p-8 flex-col items-center dark:bg-gray-700 dark:text-white'>
                <h1 className='text-2xl font-semibold mb-6'>{props.title}</h1>

                <TextInputText title='Tên' placeholder={props.placeholder} onChange={e => setName(e.target.value)} checkValidation={checkValidationName} />
                <TextInputFile title='Hình ảnh' onChange={()=>setImage('CO NHAN CHON HINH ANH')} checkValidation={checkValidationImage} />
                <Button title='Xác nhận' onClick={validation} />
                {alert ? <NotificationAlert type={alert.type} message={alert.message} onClose={hideAlert} /> : null}
            </div>
        </div>
    )
}

export default FormBasicVerOne