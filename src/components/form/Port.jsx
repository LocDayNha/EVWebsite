import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import TextInputText from '../textinput/Text'
import TextInputFile from '../textinput/File'
import Button from '../button/Button'
import NotificationAlert from '../alert/NotificationAlert';
import Radio from '../dropdown/Radio';
import Loading from '../item/Loading';
import AxiosInstance from '../util/AxiosInstance';
import { firebase } from '../../../config';

const Port = (props) => {

    const { dataName, dataElectric, dataImage, LogData, urlAddData } = props;

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
    const [isValidation, setIsValidation] = useState(null);

    const [checkValidationName, setCheckValidationName] = useState(false);
    const [checkValidationType, setCheckValidationType] = useState(false);
    const [checkValidationImage, setCheckValidationImage] = useState(false);
    const [checkLoading, setCheckLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setImage(file);
            setPreview(fileURL);
        }
    }

    const uploadImageToFirebase = async (file) => {
        try {
            if (!file) {
                throw new Error('File không hợp lệ.');
            }
            const blob = file;
            const fileName = file.name;
            const ref = firebase.storage().ref().child(fileName);
            await ref.put(blob);
            const downloadURL = await ref.getDownloadURL();
            console.log(downloadURL);
            return downloadURL; // Trả về URL của ảnh sau khi upload
        } catch (error) {
            console.log("Lỗi upload ảnh:", error);
            return null;
        }
    };

    const addData = async () => {
        try {
            setCheckLoading(true);

            const uploadImg = await uploadImageToFirebase(image);

            if (uploadImg) {
                const response = await AxiosInstance().post(urlAddData, {
                    name: name,
                    type: type,
                    image: uploadImg
                });

                if (response) {
                    setCheckLoading(false);
                    showToast('success', 'Thêm dữ liệu thành công');
                    console.log('success', 'Thêm dữ liệu thành công');
                } else {
                    setCheckLoading(false);
                    showToast('error', 'Thêm dữ liệu thất bại');
                }
            } else {
                setCheckLoading(false);
                showToast('error', 'Thêm ảnh thất bại');
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
                setType(null);
                setImage(null);
                setIsValidation(null);
            }, 100);
        }
    }, [isValidation]);

    const validation = async () => {

        let isValid = true;

        if (!name || name.trim() <= 0) {
            setCheckValidationName(true);
            showToast('error', 'Không được bỏ trống tên');
            isValid = false;
        } else {
            setCheckValidationName(false);
        }

        if (!type) {
            setCheckValidationType(true);
            showToast('error', 'Không được bỏ trống dòng điện');
            isValid = false;
        } else {
            setCheckValidationType(false);
        }

        if (!image) {
            setCheckValidationImage(true);
            showToast('error', 'Không được bỏ trống hình ảnh');
            isValid = false;
        } else {
            setCheckValidationImage(false);
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
        dataElectric(type?.name);
        dataImage(image);
    }, [name, type, image]);

    return (
        <div>
            {checkLoading ? <Loading /> :
                <div className='flex justify-center items-center min-h-screen p-4 dark:bg-gray-900'>
                    <div className='flex bg-white rounded-lg overflow-hidden w-full max-w-3xl relative p-8 flex-col items-center dark:bg-gray-700 dark:text-white'>
                        <h1 className='text-2xl font-semibold mb-6'>{props.title}</h1>
                        <TextInputText title='Tên' value={name || ''} placeholder={props.placeholder} onChange={e => setName(e.target.value)} checkValidation={checkValidationName} />
                        <Radio data={dataTypePort} title='Dòng điện' value={type || null} selectedData={setType} checkValidation={checkValidationType} />
                        <TextInputFile title='Hình ảnh' reset={image === null} onChange={handleFileChange} checkValidation={checkValidationImage} />
                        <Button title='Xác nhận' onClick={validation} />
                        {alert ? <NotificationAlert type={alert.type} message={alert.message} onClose={hideAlert} /> : null}
                    </div>
                </div>
            }
        </div>

    )
}

export default Port