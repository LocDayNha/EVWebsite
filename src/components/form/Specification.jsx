import React, { useState, useEffect } from 'react'
import TextInputText from '../textinput/Text'
import Button from '../button/Button'
import Radio from '../dropdown/Radio';
import CheckBox from '../dropdown/Checkbox';
import AxiosInstance from '../util/AxiosInstance';


const Specification = (props) => {

    const { onChange, checkValidation, value } = props;
    const [dataVehicle, setDataVehicle] = useState([]);
    const [dataPort, setDataPort] = useState([]);


    const dataTypePort =
        [
            { "_id": "wq21e1dq11ed21wd1", "name": "Cây xăng" },
            { "_id": "12e1r1feaf11fasfd", "name": "Cây Mice" }
        ]

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

    const [openViewSpecification, setOpenViewSpecification] = useState(false);

    useEffect(() => {
        getDataPort();
        getDataVehicle();
    }, []);

    return (
        <div className="w-full mt-1 mb-1 flex-col items-center">
            <div className='w-full flex justify-between items-center'>
                <span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">Danh sách trụ sạc</span>
                <div className='' onClick={() => setOpenViewSpecification(true)}>
                    <span className="text-green-700 text-sm dark:text-white">Thêm trụ sạc</span>
                </div>
            </div>

            {openViewSpecification ?
                <div className="fixed inset-0 flex items-center justify-center bg-gray-200/10 backdrop-blur-[2px] p-5 ">

                    <div className='w-160 p-3 rounded-2xl bg-white dark:bg-gray-700'>
                        <div className='w-full flex items-center justify-center'>
                            <h1 className='text-2xl font-semibold mb-6'>Trụ sạc</h1>
                        </div>

                        <div className='w-full flex justify-between'>
                            <div className='w-3/10'>
                                <TextInputText title='Công suất (kw)' placeholder='Nhập số kw' />
                            </div>
                            <div className='w-3/10'>
                                <TextInputText title='Số lượng cổng sạc' placeholder='Nhập số cổng' />
                            </div>
                            <div className='w-3/10'>
                                <TextInputText title='Giá tiền (vnđ/kwh)' placeholder='Nhập giá tiền' />
                            </div>
                        </div>

                        <div className='w-full flex justify-between mt-2'>
                            <div className='w-2/5'>
                                <Radio data={dataPort} title='Cổng sạc' />
                            </div>
                            <div className='w-2/5'>
                                <CheckBox data={dataVehicle} title='Loại phương tiện' />
                            </div>
                        </div>

                        <Button title='Xác nhận' />

                    </div>

                </div>
                :
                null
            }

            <span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">Chưa có danh sách trụ sạc</span>
        </div>
    )
}

export default Specification