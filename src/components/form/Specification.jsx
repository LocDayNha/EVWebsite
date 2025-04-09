import React, { useState, useEffect } from 'react'
import TextInputText from '../textinput/Text'
import Button from '../button/Button'
import Radio from '../dropdown/Radio';
import CheckBox from '../dropdown/Checkbox';
import AxiosInstance from '../util/AxiosInstance';
import NotificationAlert from '../alert/NotificationAlert';


const Specification = (props) => {

    const { onChange, value, setListSepc } = props;

    const [idUpdate, setIdUpdate] = useState(null);
    const [alert, setAlert] = useState(null);
    const [kw, setKw] = useState(null);
    const [slot, setSlot] = useState(null);
    const [price, setPrice] = useState(null);
    const [port, setPort] = useState(null);
    const [vehicle, setVehicle] = useState(null);

    const [listSpecification, setListSpecification] = useState([]);

    const [checkValidationKw, setCheckValidationKw] = useState(false);
    const [checkValidationSlot, setCheckValidationSlot] = useState(false);
    const [checkValidationPrice, setCheckValidationPrice] = useState(false);
    const [checkValidationPort, setCheckValidationPort] = useState(false);
    const [checkValidationVehicle, setCheckValidationVehicle] = useState(false);
    const [checkButtonEdit, setCheckButtonEdit] = useState(false);

    const [openViewSpecification, setOpenViewSpecification] = useState(false);

    const [dataVehicle, setDataVehicle] = useState([]);
    const [dataPort, setDataPort] = useState([]);


    const [selectedVehical, setSelectedVehicle] = useState([]);

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

    const addNewSpecification = async () => {
        try {

            const formattedVehical = selectedVehical.map(item => ({ vehicle_id: item._id }));
            const dataSpecification = await AxiosInstance().post('/specification/addNew',
                {
                    user_id: '67b57c10e901575e8cbeffbe', vehicle: formattedVehical, port_id: port._id, kw: kw, slot: slot, price: price
                });



            if (dataSpecification.data) {
                console.log('Thêm mới thành công:', dataSpecification.data);
                const vehicleInfo = dataSpecification.data.vehicle.map(v => ({
                    vehicle_id: v.vehicle_id._id,
                    vehicle_name: v.vehicle_id.name,
                    _id: v._id,
                }));

                const newData = {
                    ...dataSpecification.data,
                    vehicle: vehicleInfo,
                };
                setListSpecification(prevList => [...prevList, newData]);

                clearForm();
                setOpenViewSpecification(false);

            } else {
                console.log('Không tìm thấy dữ liệu từ /specification/addNew');
            }

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu Specification:', error);
        }
    };
    const updateSpecificationById = async () => {
        try {
            const formattedVehical = selectedVehical.map(item => ({ vehicle_id: item._id }));
            const response = await AxiosInstance().post('/specification/update', {
                id: idUpdate,
                vehicle: formattedVehical,
                port_id: port?._id,
                kw: kw,
                slot: slot,
                price: price
            });
            if (response.data) {
                const vehicleInfo = response.data.vehicle.map(v => ({
                    vehicle_id: v.vehicle_id._id,
                    vehicle_name: v.vehicle_id.name,
                    _id: v._id,
                }));
                console.log('vehicleInfo : ', vehicleInfo)
                const newData = {
                    ...response.data,
                    vehicle: vehicleInfo,
                };
                setListSpecification(prevList =>
                    prevList.map(item => item._id === idUpdate ? newData : item)
                );
                clearForm();
                setCheckButtonEdit(false)
                setOpenViewSpecification(false);
            } else {
                console.error('Thất bại');
                setOpenViewSpecification(false);
                setCheckButtonEdit(false)
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật Specification:", error.response?.data || error.message);
            clearForm();
            setCheckButtonEdit(false)
            setOpenViewSpecification(false);
        }
    };

    useEffect(() => {
        getDataPort();
        getDataVehicle();
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

    const clearForm = () => {
        setKw(null);
        setSlot(null);
        setPrice(null);
        setPort(null);
        setSelectedVehicle([]);
    }

    const validation = async () => {

        let isValid = true;

        if (kw === null || kw === undefined || kw === '') {
            setCheckValidationKw(true);
            showToast('error', 'Không được bỏ trống công suất');
            isValid = false;
        } else if (isNaN(kw) || Number(kw) <= 0) {
            setCheckValidationKw(true);
            showToast('error', 'Số công suất không hợp lệ');
            isValid = false;
        } else {
            setCheckValidationKw(false);
        }

        if (slot === null || slot === undefined || slot === '') {
            setCheckValidationSlot(true);
            showToast('error', 'Không được bỏ trống cổng sạc');
            isValid = false;
        } else if (isNaN(slot) || Number(slot) <= 0) {
            setCheckValidationSlot(true);
            showToast('error', 'Số cổng sạc không hợp lệ');
            isValid = false;
        } else {
            setCheckValidationSlot(false);
        }

        if (price === null || price === undefined || price === '') {
            setCheckValidationPrice(true);
            showToast('error', 'Không được bỏ trống giá tiền');
            isValid = false;
        } else if (isNaN(price) || Number(price) <= 0) {
            setCheckValidationPrice(true);
            showToast('error', 'Số tiền không hợp lệ');
            isValid = false;
        } else {
            setCheckValidationPrice(false);
        }

        if (!port) {
            setCheckValidationPort(true);
            showToast('error', 'Không được bỏ trống cổng sạc');
            isValid = false;
        } else {
            setCheckValidationPort(false);
        }

        if (selectedVehical.length <= 0) {
            setCheckValidationVehicle(true);
            showToast('error', 'Không được bỏ trống phương tiện');
            isValid = false;
        } else {
            setCheckValidationVehicle(false);
        }

        if (!isValid) {
            return;
        }
        await addNewSpecification();
        setAlert(null);

    }

    const handleAdd = () => {
        const newSpecification = {
            kw,
            slot,
            price,
            port: port ? port : 'N/A',
            vehicle: selectedVehical.length > 0 ? selectedVehical : 'N/A'
        };

        setListSpecification(prevList => [...prevList, newSpecification]);

        clearForm();
        setOpenViewSpecification(false);
    };

    const setDataEdit = (index) => {
        clearForm();
        setCheckButtonEdit(true);
        setIdUpdate(index);
        const itemToEdit = listSpecification.find(item => item._id === index);
        if (!itemToEdit) return;
        setKw(itemToEdit.kw);
        setSlot(itemToEdit.slot);
        setPrice(itemToEdit.price);
        setPort(itemToEdit.port_id);
        setSelectedVehicle(itemToEdit.vehicle.map(v => ({ name: v.vehicle_name, _id: v.vehicle_id })));
        setOpenViewSpecification(true);
    };



    const handleDelete = (index) => {

        const newList = [...listSpecification];
        newList.splice(index, 1);
        setListSpecification(newList);
    };
    const deleteSpecificationById = async (id) => {
        try {
            if (window.confirm("Bạn có chắc muốn xóa?")) {
                const dataSpecificationById = await AxiosInstance().delete('/specification/deleteById',
                    {
                        data: { id }
                    });

                if (dataSpecificationById) {
                    console.log('Xóa SpecificationById thành công')

                    handleDelete(id);
                } else {

                    console.log('Không tìm thấy dữ liệu từ /specification/addNew');
                }
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu Specification:', error);

        }
    }
    useEffect(() => {
        if (listSpecification.length > 0) {
            setListSepc(listSpecification)
        }
    }, [listSpecification]);
    // useEffect(() => {
    //     console.log("vehicle : ", selectedVehical);
    //     //console.log("port : ", port?._id);
    // }, [selectedVehical]);
    // useEffect(() => {
    //     console.log('listSpecification : ', listSpecification);

    // }, [listSpecification]);

    return (
        <div className="w-full mt-3 mb-3 flex-col items-center">
            <div className='w-full flex justify-between items-center'>
                <span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">Danh sách trụ sạc</span>
                <div className='' onClick={() => setOpenViewSpecification(true)}>
                    <span className="text-green-700 text-sm dark:text-white">Thêm trụ sạc</span>
                </div>
            </div>

            {openViewSpecification ?
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500/10 backdrop-blur-[2px] p-5 ">

                    <div className='w-160 p-3 rounded-2xl bg-white dark:bg-gray-700'>

                        <button className='hover:text-red-500' onClick={() => { setOpenViewSpecification(false); clearForm(); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <div className='w-full flex items-center justify-center'>
                            <h1 className='text-2xl font-semibold mb-6'>Trụ sạc</h1>
                        </div>

                        <div className='w-full flex justify-between'>
                            <div className='w-3/10'>
                                <TextInputText
                                    title='Công suất (kw)'
                                    placeholder='Nhập số kw'
                                    value={kw || ''}
                                    onChange={e => setKw(e.target.value)}
                                    checkValidation={checkValidationKw} />
                            </div>
                            <div className='w-3/10'>
                                <TextInputText
                                    title='Số lượng cổng sạc'
                                    placeholder='Nhập số cổng'
                                    value={slot || ''}
                                    onChange={e => setSlot(e.target.value)}
                                    checkValidation={checkValidationSlot} />
                            </div>
                            <div className='w-3/10'>
                                <TextInputText
                                    title='Giá tiền (vnđ/kwh)'
                                    placeholder='Nhập giá tiền'
                                    value={price || ''}
                                    onChange={e => setPrice(e.target.value)}
                                    checkValidation={checkValidationPrice} />
                            </div>
                        </div>

                        <div className='w-full flex justify-between mt-2'>
                            <div className='w-2/5'>
                                <Radio
                                    data={dataPort}
                                    title='Cổng sạc'
                                    value={port || null}
                                    selectedData={setPort}
                                    checkValidation={checkValidationPort}
                                />
                            </div>
                            <div className='w-2/5'>
                                <CheckBox
                                    data={dataVehicle}
                                    title='Loại phương tiện'
                                    selectedCheckBox={selectedVehical}
                                    setSelectedCheckBox={setSelectedVehicle}
                                    checkValidation={checkValidationVehicle}
                                />

                            </div>
                        </div>
                        {checkButtonEdit ?
                            <Button title='Cập nhật' onClick={updateSpecificationById} />
                            :
                            <Button title='Xác nhận' onClick={validation} />
                        }


                    </div>

                    {alert ? <NotificationAlert type={alert.type} message={alert.message} onClose={hideAlert} /> : null}

                </div>
                :
                null
            }

            <div className="flex flex-col items-center mt-3">
                {listSpecification?.length === 0 ? (
                    <span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">
                        Chưa có danh sách trụ sạc
                    </span>
                ) : (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="border border-gray-300 px-2 py-2">Công suất (kw)</th>
                                <th className="border border-gray-300 px-2 py-2">Số cổng</th>
                                <th className="border border-gray-300 px-2 py-2">Giá (đ/kwh)</th>
                                <th className="border border-gray-300 px-2 py-2">Cổng</th>
                                <th className="border border-gray-300 px-2 py-2">Loại xe</th>
                                <th className="px-4 py-2"></th>
                                {listSpecification.length <= 1 ?
                                    null
                                    :
                                    <th className="px-4 py-2"></th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {listSpecification?.map((data, index) => (
                                <tr key={index} className="border border-gray-300 text-center">
                                    <td className="border border-gray-300 px-2 py-2">{data.kw || 'N/A'}</td>
                                    <td className="border border-gray-300 px-2 py-2">{data.slot || 'N/A'}</td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {data.price ? new Intl.NumberFormat('vi-VN').format(data.price) : 'N/A'}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">{data.port_id?.type || 'N/A'} - {data.port_id?.name || 'N/A'}</td>
                                    <td className="border border-gray-300 px-2 py-2">{data.vehicle.length > 1 ? 'Tất cả' : data.vehicle[0].vehicle_name}</td>
                                    <td className=" items-center justify-between">
                                        <button
                                            onClick={() => setDataEdit(data._id)}
                                            className=" text-blue-500 px-1 py-1 rounded hover:bg-blue-600 hover:text-white mr-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                                            </svg>
                                        </button>
                                    </td>
                                    {/* tam thoi sua  */}
                                    {listSpecification.length <= 0 ?
                                        null
                                        :
                                        <td className=" items-center justify-between">
                                            <button
                                                className="text-red-500 px-1 py-1 rounded hover:bg-red-600 hover:text-white"
                                                onClick={() =>
                                                    deleteSpecificationById(data._id)
                                                }
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </td>
                                    }

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>


        </div>
    )
}

export default Specification