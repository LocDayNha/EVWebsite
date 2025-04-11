import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import TextInputText from '../textinput/Text'
import TextInputFile from '../textinput/File'
import Button from '../button/Button'
import NotificationAlert from '../alert/NotificationAlert';
import Loading from './Loading';
import AxiosInstance from '../util/AxiosInstance';
import { firebase } from '../../../config';
import Radio from '../dropdown/Radio';



const UpdatePort = (props) => {
    const dataTypePort =
        [
            { "_id": "wq21e1dq11ed21wd1", "name": "AC" },
            { "_id": "12e1r1feaf11fasfd", "name": "DC" }
        ]

    const { urlUpdateData, name, setDataName, dataImage, setCheckLoading, LogData, setCheck, id } = props;

    const navigate = useNavigate();

    const [alert, setAlert] = useState(null);
    const [image, setImage] = useState(null);
    const [isValidation, setIsValidation] = useState(null);
    const [type, setType] = useState(null);

    const [checkValidationName, setCheckValidationName] = useState(false);
    const [checkValidationImage, setCheckValidationImage] = useState(false);
    const [checkValidationType, setCheckValidationType] = useState(false);


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

    const UpdateData = async () => {
        try {
            setCheckLoading(true);

            const uploadImg = await uploadImageToFirebase(image);

            if (uploadImg) {
                const response = await AxiosInstance().post(urlUpdateData, {
                    id: id,
                    name: name,
                    image: uploadImg,
                    type: type
                });

                if (response) {
                    setCheckLoading(false);
                    showToast('success', 'Cập nhật dữ liệu thành công ');
                    console.log('success', 'Cập nhật dữ liệu thành công');
                } else {
                    setCheckLoading(false);
                    showToast('error', 'Cập nhật dữ liệu thất bại');
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
                setDataName(null);
                setImage(null);
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
        UpdateData();
        setIsValidation(true);
        setCheck(false);
        setAlert(null);
    }

    useEffect(() => {
        setDataName(name);
        dataImage(image);
    }, [name, image]);

    return (
        <div>

            <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-500/10 backdrop-blur-[2px] p-5">
                <div className="w-full max-w-[500px]">
                    <div className="items-right justify-right">
                        <button className='hover:text-red-500' onClick={() => setCheck(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='flex justify-center items-center p-4 dark:bg-gray-900'>
                    <div className='flex bg-white rounded-lg overflow-hidden w-full max-w-3xl relative p-8 flex-col items-center dark:bg-gray-700 dark:text-white'>
                        <h1 className='text-2xl font-semibold mb-6'>{props.title}</h1>
                        <TextInputText title='Tên' value={name || ''} placeholder={props.placeholder} onChange={e => setDataName(e.target.value)} checkValidation={checkValidationName} />
                        <Radio data={dataTypePort} title='Dòng điện' value={type || null} selectedData={setType} checkValidation={checkValidationType} />
                        <TextInputFile title='Hình ảnh' reset={image === null} onChange={handleFileChange} checkValidation={checkValidationImage} />
                        Vui lòng chọn ảnh hình vuông để hiển thị chính xác nhất !
                        <Button title='Xác nhận' onClick={validation} />
                        {/* {preview && <img src={preview} alt="Preview" style={{ width: 200 }} />} */}
                        {alert ? <NotificationAlert type={alert.type} message={alert.message} onClose={hideAlert} /> : null}
                    </div>
                </div>
            </div>

        </div>

    )
}

export default UpdatePort