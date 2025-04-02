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

const Station = (props) => {

    const { dataName, dataImage, LogData } = props;
    const [dataBrandCar, setDataBrandCar] = useState([]);
    const [dataAddress, setDataAddress] = useState([]);
    const [dataService, setDataService] = useState([]);
    const [dataBrandStation, setDataBrandStation] = useState([]);

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

    return (
        <div className='flex justify-center items-center min-h-screen p-4 dark:bg-gray-900'>
            <div className='flex bg-white rounded-lg overflow-hidden w-full max-w-3xl relative p-8 flex-col items-center dark:bg-gray-700 dark:text-white'>
                <h1 className='text-2xl font-semibold mb-6'>{props.title}</h1>
                <TextInputFile title='Hình ảnh' />
                <TextInputText title='Tên trạm sạc' placeholder='Nhập tên' />
                <TextInputText title='Địa chỉ trạm sạc' placeholder='Chọn địa chỉ' />
                <Radio title='Nơi đặt trạm sạc' data={dataAddress} />
                <Radio title='Hãng trụ sạc' data={dataBrandStation} />

                <Specification />
                <p>Lựa chọn thêm </p>
                <TextInputText title='Ghi chú' placeholder='Nhập ghi chú' />
                <CheckBox title='Hãng Xe' data={dataBrandCar} />
                <CheckBox title='Dịch vụ' data={dataService} />

                <Button title='Xác nhận' />

            </div>
        </div >
    )
}

export default Station