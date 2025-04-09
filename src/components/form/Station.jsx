import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import TextInputText from '../textinput/Text'
import TextInputFile from '../textinput/File'
import Button from '../button/Button'
import NotificationAlert from '../alert/NotificationAlert';
import Radio from '../dropdown/Radio';
import Specification from './Specification';
import CheckBox from '../dropdown/Checkbox';
import AxiosInstance from '../util/AxiosInstance';
import MyMap from '../item/MyMap';
import TimeStation from '../item/Time';
import { firebase } from '../../../config';

const Station = (props) => {

    const [alert, setAlert] = useState(null);
    const [image, setImage] = useState(null);
    const [name, setName] = useState(null);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [brandStation, setBrandStation] = useState(null);
    const [specification, setSpecification] = useState([]);
    const [note, setNote] = useState(null);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [timeStation, setTimeStation] = useState(null);

    const [checkValidationImage, setCheckValidationImage] = useState(false);
    const [checkValidationName, setCheckValidationName] = useState(false);
    const [checkValidationLocation, setCheckValidationLocation] = useState(false);
    const [checkValidationAddress, setCheckValidationAddress] = useState(false);
    const [checkValidationBrandStation, setCheckValidationBrandStation] = useState(false);
    const [checkValidationTime, setCheckValidationTime] = useState(false);
    const [checkValidationSpecification, setCheckValidationSpecification] = useState(false);
    const [checkValidationService, setCheckValidationService] = useState(false);
    const [checkValidationBrandCar, setCheckValidationBrandCar] = useState(false);
    const [checkValidationNote, setCheckValidationNote] = useState(false);
    const [checkMap, setCheckMap] = useState(false);

    const [dataBrandCar, setDataBrandCar] = useState([]);
    const [dataAddress, setDataAddress] = useState([]);
    const [dataService, setDataService] = useState([]);
    const [dataBrandStation, setDataBrandStation] = useState([]);

    const [selectedServices, setSelectedService] = useState([]);
    const [selectedBrandCar, setSelectedBrandCar] = useState([]);

    const getDataBrandCar = async () => {
        try {
            const response = await AxiosInstance().get('/brandcar/get');
            if (response.data) {
                setDataBrandCar(response.data);
            } else {
                console.error("Không tìm thấy dữ liệu");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };
    const getDataBrandStation = async () => {
        try {
            const response = await AxiosInstance().get('/brand/get');
            if (response.data) {
                setDataBrandStation(response.data);
            } else {
                console.error("Không tìm thấy dữ liệu");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };
    const getDataAddress = async () => {
        try {
            const response = await AxiosInstance().get('/location/get');
            if (response.data) {
                setDataAddress(response.data);
            } else {
                console.error("Không tìm thấy dữ liệu");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };
    const getDataService = async () => {
        try {
            const response = await AxiosInstance().get('/services/get');
            if (response.data) {
                setDataService(response.data);
            } else {
                console.error("Không tìm thấy dữ liệu");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    useEffect(() => {
        getDataBrandCar();
        getDataBrandStation();
        getDataAddress();
        getDataService();
    }, []);

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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setImage(file);
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

    const clearForm = () => {
        setImage(null);
        setName(null);
        setLocation(null);
        setAddress(null);
        setBrandStation(null);
        setSpecification([]);
        setSelectedCheckBox(null);
        setSelectedBrandCar(null);
        setNote(null);
    }

    const logData = () => {

        const formattedLocation = location.split(',').map(part => part.trim()).filter(part => !/^\d{5}$/.test(part)).join(', ');
        
        console.log('Hình ảnh trạm sạc:', image);
        console.log('Tên trạm sạc:', name);
        console.log('Địa chỉ trạm sạc:', formattedLocation);
        console.log('Nơi đặt trạm sạc:', address);
        console.log('Hãng trạm sạc:', brandStation);
        console.log('Thời gian:', timeStation);
        console.log('Trụ sạc:', specification);
        console.log('Dịch vụ:', selectedServices);
        console.log('Hãng xe:', selectedBrandCar);
        console.log('Ghi chú:', note);

    }
    const addNewStaion = async () => {

        try {
            const uploadImg = await uploadImageToFirebase(image);
            if (uploadImg) {
                const formattedServices = selectedServices ? selectedServices.map(item => ({ service_id: item._id })) : null;
                const formattedBrandCar = selectedBrandCar ? selectedBrandCar.map(item => ({ brandcar_id: item._id })) : null;
                const formattedSpecifications = specification ? specification.map(item => ({
                    specification_id: item._id
                })) : null;
                try {

                    const payload = {
                        user_id: '67b57c10e901575e8cbeffbe',
                        brand_id: brandStation._id,
                        specification: formattedSpecifications,
                        image: uploadImg,
                        name: name,
                        location: location,
                        lat: lat,
                        lng: lng,
                        time: timeStation,
                        note: note,
                        address: address._id,
                        brandcar: formattedBrandCar,
                        service: formattedServices
                    };

                    if (formattedServices !== null) payload.service = formattedServices;
                    if (formattedBrandCar !== null) payload.brandcar = formattedBrandCar;

                    const dataStation = await AxiosInstance().post('/station/addNew', payload);

                    if (dataStation) {
                        console.log('Thêm mới dữ liệu Station thành công:');
                    } else {
                        console.error('Không tìm thấy dữ liệu Station');
                    }

                } catch (error) {
                    console.log('error:', error);
                }
            } else {
                console.log('Thêm ảnh chưa được ')
            }

        } catch (error) {
            console.error('Lỗi khi thêm mới dữ liệu Station:', error);
        }
    }

    const validation = async () => {

        let isValid = true;

        if (!image) {
            setCheckValidationImage(true);
            showToast('error', 'Không được bỏ trống hình ảnh');
            isValid = false;
        } else {
            setCheckValidationImage(false);
        }

        if (!name || name.trim() <= 0) {
            setCheckValidationName(true);
            showToast('error', 'Không được bỏ trống tên');
            isValid = false;
        } else {
            setCheckValidationName(false);
        }

        if (!location || location.trim() <= 0) {
            setCheckValidationLocation(true);
            showToast('error', 'Không được bỏ trống địa chỉ');
            isValid = false;
        } else {
            setCheckValidationLocation(false);
        }

        if (!address) {
            setCheckValidationAddress(true);
            showToast('error', 'Không được bỏ trống nơi đặt trạm sạc');
            isValid = false;
        } else {
            setCheckValidationAddress(false);
        }

        if (!brandStation) {
            setCheckValidationBrandStation(true);
            showToast('error', 'Không được bỏ trống hãng trụ sạc');
            isValid = false;
        } else {
            setCheckValidationBrandStation(false);
        }
        if (!timeStation) {
            setCheckValidationTime(true);
            showToast('error', 'Chưa chọn thời gian');
            isValid = false;
        } else {
            setCheckValidationTime(false);
        }

        if (specification.length <= 0) {
            setCheckValidationSpecification(true);
            showToast('error', 'Phải có ít nhất một trụ sạc');
            isValid = false;
        } else {
            setCheckValidationSpecification(false);
        }

        if (!isValid) {
            return;
        }

        addNewStaion();
        setAlert(null);

    }

    return (
        <div className='flex justify-center items-center min-h-screen p-4 dark:bg-gray-900'>
            <div className='flex bg-white rounded-lg overflow-hidden w-full max-w-3xl relative p-8 flex-col items-center dark:bg-gray-700 dark:text-white'>
                <h1 className='text-2xl font-semibold mb-6'>{props.title}</h1>
                <TextInputFile
                    title='Hình ảnh'
                    reset={image === null}
                    onChange={handleFileChange}
                    checkValidation={checkValidationImage} />
                <TextInputText
                    title='Tên trạm sạc'
                    placeholder='Nhập tên'
                    value={name || ''}
                    onChange={e => setName(e.target.value)}
                    checkValidation={checkValidationName} />
                <MyMap
                    title='Địa chỉ trạm sạc'
                    value={location || 'Chọn địa điểm '}
                    onChange={() => { setCheckMap(true); }}
                    checkMap={checkMap}
                    setCheckMap={setCheckMap}
                    setLocation={setLocation}
                    setLat={setLat}
                    setLng={setLng}
                    checkValidation={checkValidationLocation} />
                <Radio
                    title='Nơi đặt trạm sạc'
                    data={dataAddress}
                    value={address || null}
                    selectedData={setAddress}
                    checkValidation={checkValidationAddress}
                />
                <Radio
                    title='Hãng trụ sạc'
                    data={dataBrandStation}
                    value={brandStation || null}
                    selectedData={setBrandStation}
                    checkValidation={checkValidationBrandStation}
                />

                <div className={`w-full mt-2 ${checkValidationTime ? 'border border-red-500' : ''}`}>
                    <TimeStation timeStation={timeStation} setTimeStation={setTimeStation} />
                </div>

                <div className={`w-full mt-3 mb-3 ${checkValidationSpecification ? 'border border-red-500' : ''}`}>
                    <Specification setListSepc={setSpecification} />
                </div>

                <p>Lựa chọn thêm </p>

                <CheckBox
                    title='Dịch vụ'
                    data={dataService}
                    checkValidation={checkValidationService}
                    selectedCheckBox={selectedServices}
                    setSelectedCheckBox={setSelectedService}
                />
                <CheckBox
                    title='Hãng Xe'
                    data={dataBrandCar}
                    checkValidation={checkValidationBrandCar}
                    selectedCheckBox={selectedBrandCar}
                    setSelectedCheckBox={setSelectedBrandCar}
                />
                <TextInputText
                    title='Ghi chú'
                    placeholder='Nhập ghi chú'
                    value={note || ''}
                    onChange={e => setNote(e.target.value)}
                    checkValidation={checkValidationNote} />

                <Button title='Xác nhận' onClick={validation} />

            </div>

            {alert ? <NotificationAlert type={alert.type} message={alert.message} onClose={hideAlert} /> : null}
        </div >
    )
}

export default Station