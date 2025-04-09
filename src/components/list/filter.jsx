import React, { useState, useEffect } from 'react'
import AxiosInstance from '../util/AxiosInstance';
import CheckBox from './checkbox';
const formData =
    [
        { "_id": "1", "name": "Hãng xe" },
        { "_id": "2", "name": "Hãng trạm sạc" },
        { "_id": "3", "name": "Địa chỉ" },
        { "_id": "4", "name": "Dịch vụ" },
        { "_id": "5", "name": "Đầu sạc" },
        { "_id": "6", "name": "Loại phương tiện" },


    ]

const Filter = () => {
    const [numberList, setNumberList] = useState(1);
    const [selectedBrandCar, setSelectedBrandCar] = useState([]);
    const [selectedBrandStation, setSelectedBrandStation] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState([]);
    const [selectedService, setSelectedService] = useState([]);
    const [selectedPort, setSelectedPort] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState([]);

    const [dataBrandCar, setDataBrandCar] = useState([]);
    const [dataAddress, setDataAddress] = useState([]);
    const [dataService, setDataService] = useState([]);
    const [dataBrandStation, setDataBrandStation] = useState([]);
    const [dataPort, setDataPort] = useState([]);
    const [dataVehicle, setDataVehicle] = useState([]);


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
    const getDataPort = async () => {
        try {
            const response = await AxiosInstance().get('/port/get');
            if (response.data) {
                setDataPort(response.data);
            } else {
                console.error("Không tìm thấy dữ liệu");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };
    const getDataVehicle = async () => {
        try {
            const response = await AxiosInstance().get('/vehicle/get');
            if (response.data) {
                setDataVehicle(response.data);
            } else {
                console.error("Không tìm thấy dữ liệu");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };
    const clearForm = () => {
        setSelectedBrandCar([]);
        setSelectedBrandStation([]);
        setSelectedAddress([]);
        setSelectedService([]);
        setSelectedPort([]);
        setSelectedVehicle([]);
    }
    useEffect(() => {
        getDataBrandCar();
        getDataBrandStation();
        getDataAddress();
        getDataService();
        getDataPort();
        getDataVehicle();
    }, []);
    return (
        <div className='w-full p-10'>
            <div className="flex items-center justify-between mb-4 text-gray-900">
                <div>
                    Bộ lọc chi tiết
                </div>

            </div>
            <div className="flex ">
                <ul className="py-2 space-y-2">
                    {formData.map((data) => (
                        <li key={data._id}>
                            {data._id == numberList ?
                                <div
                                    onClick={() => setNumberList(data._id)}
                                    className="flex items-center w-45 p-4 text-white transition duration-75 rounded-lg pl-5 bg-gradient-to-r from-green-700 to-green-500"
                                >
                                    {data.name}

                                </div>
                                :
                                <div
                                    onClick={() => setNumberList(data._id)}
                                    className="flex items-center w-45 p-4 text-gray-900 transition duration-75 rounded-lg pl-5 group bg-gray-200 dark:text-white"
                                >
                                    {data.name}

                                </div>
                            }


                        </li>
                    ))}
                    <div>
                        <div
                            onClick={() => { clearForm(); }}
                            className="flex items-center mt-20 w-50 p-4 text-white transition duration-75 rounded-lg pl-5 bg-gray-500 "
                        >
                            Làm mới

                        </div>
                    </div>
                </ul>
                {numberList == 1 ? <CheckBox selectedCheckBox={selectedBrandCar} setSelectedCheckBox={setSelectedBrandCar} dataL={dataBrandCar} /> : null}
                {numberList == 2 ? <CheckBox selectedCheckBox={selectedBrandStation} setSelectedCheckBox={setSelectedBrandStation} dataL={dataBrandStation} /> : null}
                {numberList == 3 ? <CheckBox selectedCheckBox={selectedAddress} setSelectedCheckBox={setSelectedAddress} dataL={dataAddress} /> : null}
                {numberList == 4 ? <CheckBox selectedCheckBox={selectedService} setSelectedCheckBox={setSelectedService} dataL={dataService} /> : null}
                {numberList == 5 ? <CheckBox selectedCheckBox={selectedPort} setSelectedCheckBox={setSelectedPort} dataL={dataPort} /> : null}
                {numberList == 6 ? <CheckBox selectedCheckBox={selectedVehicle} setSelectedCheckBox={setSelectedVehicle} dataL={dataVehicle} /> : null}
            </div>

        </div>
    )
}

export default Filter