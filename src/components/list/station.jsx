import React, { useState, useEffect } from "react";
import Select from "react-select";
import AxiosInstance from '../../components/util/AxiosInstance';
import Loading from '../../components/item/Loading';
import ConfirmAlert from "../alert/ConfirmAlert";
import NotificationAlert from "../alert/NotificationAlert";
import NotificationApiAlert from "../alert/NotificationApiAlert";

const Station = ({ filteredData, number, getData }) => {

    const [textSearch, setTextSearch] = useState(null);
    const [sortConfig, setSortConfig] = useState(null);
    const [checkAlertComfirm, setCheckAlertConfirm] = useState(false);
    const [id, setItemId] = useState(null);
    const [isActive, setItemIsActive] = useState(null);
    const [textMessage, setTextMessage] = useState(null);
    const [checkAlertNotification, setCheckAlertNotification] = useState(false);

    const updateStatusStation = async ({ id, isActive }) => {
        try {

            const response = await AxiosInstance().post('/station/updateisActive', {
                id: id, isActive: isActive
            });
            if (response) {
                console.log('Cập nhật trạng thái thành công');
                setTextMessage('Cập nhật trạng thái thành công');
                setCheckAlertNotification(true);
                getData(number);

            } else {
                console.log('Không có dữ liệu');
                setTextMessage('Không có dữ liệu');
                setCheckAlertNotification(true);
            }

        } catch (error) {

            console.error('Lỗi khi lấy dữ liệu station:', error);
            setTextMessage('Không có dữ liệu');
            setCheckAlertNotification(true);
        }
    };

    const onComfirm = () => {
        setCheckAlertConfirm(false);
        updateStatusStation({ id, isActive });
    }
    const onCancel = () => {
        setCheckAlertConfirm(false);
    }
    const onClose = () => {
        setCheckAlertNotification(false);
    }

    const sortedData = [...filteredData];
    if (sortConfig !== null) {
        sortedData.sort((a, b) => {
            const valueA = sortConfig.key.includes(".")
                ? sortConfig.key.split(".").reduce((o, k) => (o ? o[k] : ""), a)
                : a[sortConfig.key];

            const valueB = sortConfig.key.includes(".")
                ? sortConfig.key.split(".").reduce((o, k) => (o ? o[k] : ""), b)
                : b[sortConfig.key];

            return valueA.localeCompare(valueB, 'vi', { sensitivity: 'base' }) *
                (sortConfig.direction === 'ascending' ? 1 : -1);
        });
    }

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        if (textSearch) {
            requestSort(textSearch);
        } else {
            console.log('Không có KEY');
        }
    }, [textSearch]);

    return (
        <div className="max-h-screen overflow-y-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                            </div>
                        </th>
                        <th scope="col" className="pl-6 py-3 text-center" onClick={() => setTextSearch('name')}>
                            <div className="flex items-center justify-center">
                                Tên trạm
                                <div>
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3" onClick={() => setTextSearch('location')}>
                            <div className="flex items-center justify-center">
                                Địa chỉ
                                <div>
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3" onClick={() => setTextSearch('time')}>
                            <div className="flex items-center justify-center">
                                Thời gian
                                <div>
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3" onClick={() => setTextSearch('brand_id.name')}>
                            <div className="flex items-center justify-center">
                                Hãng trạm sạc
                                <div>
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3" onClick={() => setTextSearch('address.name')}>
                            <div className="flex items-center justify-center">
                                Nơi đặt trạm sạc
                                <div>
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center justify-center">
                                Trụ sạc
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center justify-center">
                                Dịch vụ
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center justify-center">
                                Ghi chú
                            </div>
                        </th>
                        {number === 2 || number === 4 ?
                            <>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center justify-center">
                                        Trạng thái
                                    </div>
                                </th>
                            </>
                            :
                            null
                        }

                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Sửa</span>
                        </th>
                        {number === 1 ?
                            <>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Chấp nhận</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Từ chối</span>
                                </th>
                            </>
                            :
                            null
                        }
                    </tr>
                </thead>

                <tbody>
                    {sortedData.length === 0 ? (
                        <tr>
                            <td colSpan="10" className="text-center py-4 text-gray-900 dark:text-white">
                                Không có dữ liệu
                            </td>
                        </tr>
                    ) : (
                        sortedData.map((item, index) => (

                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <td className="pl-4 py-4">
                                    <img src={item.image} className="w-50 h-30 object-cover" />
                                </td>
                                <td className="text-center pl-6 py-4 w-40 font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                </td>
                                <td className="pl-6 py-4 text-center w-40 font-medium text-gray-900 dark:text-white">
                                    {item.location}
                                </td>
                                <td className="py-4 text-center font-medium text-gray-900 dark:text-white">
                                    {item.time}
                                </td>
                                <td className="py-4 text-center font-medium text-gray-900 dark:text-white">
                                    {item.brand_id.name}
                                </td>
                                <td className="py-4 text-center font-medium text-gray-900 dark:text-white">
                                    {item.address.name}
                                </td>

                                <td className="py-4">
                                    <Select
                                        options={item.specification.map(specification => ({
                                            value: specification.specification_id._id,
                                            label: (
                                                <div>
                                                    <div className=''>
                                                        <div className='font-medium text-gray-900'>
                                                            {specification.specification_id.port_id.type} - {specification.specification_id.port_id.name}
                                                        </div>
                                                    </div>
                                                    <div className='font-medium text-gray-900'>
                                                        Công suất: {specification.specification_id.kw} kw
                                                    </div>
                                                    <div className='font-medium text-gray-900'>
                                                        Giá: {specification.specification_id.price.toLocaleString("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND"
                                                        })}
                                                    </div>
                                                    <div className='font-medium text-gray-900'>
                                                        Cổng sạc: {specification.specification_id.slot}
                                                    </div>
                                                </div>
                                            ),
                                            image: specification.specification_id.port_id.image,
                                        }))}
                                        isSearchable={false}
                                        value={null}
                                        getOptionLabel={(e) => (
                                            <div className="flex items-center font-medium text-gray-900">
                                                <img src={e.image} alt={e.label} className="w-12 h-12 mr-2" />
                                                {e.label}
                                            </div>
                                        )}
                                        styles={{
                                            menu: (base) => ({ ...base, zIndex: 9999, width: 200 }),
                                            menuList: (base) => ({
                                                ...base,
                                                overflow: "hidden",
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                backgroundColor: state.isFocused ? "transparent" : base.backgroundColor,
                                            }),
                                        }}
                                        placeholder={item.specification.length + ' trụ sạc'}
                                    />
                                </td>

                                <td className="pl-6 py-4 text-center">
                                    <Select
                                        options={item.service.map(service => ({
                                            value: service.service_id._id,
                                            label: service.service_id.name,
                                            image: service.service_id.image
                                        }))}
                                        isSearchable={false}
                                        value={null}
                                        getOptionLabel={(e) => (
                                            <div className="flex items-center font-medium text-gray-900">
                                                <img src={e.image} alt={e.label} className="w-6 h-6 mr-2" />
                                                {e.label}
                                            </div>
                                        )}
                                        styles={{
                                            menu: (base) => ({ ...base, zIndex: 9999, width: 150 }),
                                            menuList: (base) => ({
                                                ...base,
                                                overflow: "hidden",
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                backgroundColor: state.isFocused ? "transparent" : base.backgroundColor,
                                            }),
                                        }}
                                        placeholder={item.service.length + ' dịch vụ'}
                                    />
                                </td>

                                <td className="py-4 text-center font-medium text-gray-900 dark:text-white">{item.note ? item.note : 'Không có'}</td>

                                {item.isActive === 2 || item.isActive === 4 ?
                                    <>
                                        <td className="px-6 py-4 text-center">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={item.isActive === 2}
                                                    onChange={() => {
                                                        const isActive = item.isActive === 2 ? 4 : 2;
                                                        const id = item._id;
                                                        setItemId(id);
                                                        setItemIsActive(isActive);
                                                        setCheckAlertConfirm(true);
                                                    }}
                                                />
                                                <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition-all duration-300">
                                                    <div className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 
                                                ${item.isActive === 2 ? "translate-x-6" : "translate-x-0"}`}>
                                                    </div>
                                                </div>
                                            </label>
                                        </td>
                                    </>
                                    :
                                    null
                                }

                                {item.isActive === 1 ?
                                    <>
                                        <td
                                            onClick={() => {
                                                const isActive = 2;
                                                const id = item._id;
                                                setItemId(id);
                                                setItemIsActive(isActive);
                                                setCheckAlertConfirm(true);
                                            }}
                                            className="px-6 py-4 text-right">
                                            <a className="font-medium text-green-500 dark:text-white text-2xl">✓</a>
                                        </td>
                                        <td
                                            onClick={() => {
                                                const isActive = 3;
                                                const id = item._id;
                                                setItemId(id);
                                                setItemIsActive(isActive);
                                                setCheckAlertConfirm(true);
                                            }}
                                            className="px-6 py-4 text-right w-10">
                                            <a className="font-medium text-red-500 dark:text-white text-2xl">✗</a>
                                        </td>
                                    </>
                                    :
                                    null
                                }
                                {item.isActive === 3 ?
                                    null :
                                    <td className="px-6 py-4 text-right">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Sửa</a>
                                    </td>
                                }
                            </tr>
                        ))
                    )}
                </tbody>

            </table>
            {
                checkAlertComfirm ?
                    <ConfirmAlert
                        title={'Trạng thái trạm sạc'}
                        message={'Bạn có muốn thay đổi trạng thái trạm sạc'}
                        onCancel={onCancel}
                        onComfirm={onComfirm}
                    /> : null
            }
            {
                checkAlertNotification ?
                    <NotificationApiAlert
                        title={'Thông báo server'}
                        message={textMessage}
                        onClose={onClose}
                    /> : null
            }
        </div>

    );
};

export default Station;
