import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../components/util/AxiosInstance';
import Select from "react-select";
import Loading from '../../components/item/Loading';

const Test = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState(null);

    const [dataStation, setDataStation] = useState([]);
    const [number, setNumber] = useState(null);
    const [selectItem, setSelectItem] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    const getDataStation = async (isActive) => {
        try {
            setDataStation([]);
            const dataStation = await AxiosInstance().post('/station/getByActive', { isActive: isActive });
            if (dataStation.data && dataStation.data.length > 0) {
                setDataStation(dataStation.data);
                setNumber(isActive);
                if (isActive === 2) {
                    setIsPaused(true);
                } else {
                    setIsPaused(false);
                }
            } else {
                setDataStation([]);
                console.log('Không tìm thấy dữ liệu từ /station/getByActive');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu station:', error);
        }
    };

    const OpenClose = async (id) => {
        setSelectItem(id);
        setIsPaused(!isPaused);
    }

    const filteredData = dataStation.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand_id.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.address.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedData = [...filteredData];
    if (sortConfig !== null) {
        sortedData.sort((a, b) => {
            const valueA = sortConfig.key.includes(".")
                ? sortConfig.key.split(".").reduce((o, k) => (o ? o[k] : ""), a)
                : a[sortConfig.key];

            const valueB = sortConfig.key.includes(".")
                ? sortConfig.key.split(".").reduce((o, k) => (o ? o[k] : ""), b)
                : b[sortConfig.key];

            if (valueA < valueB) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
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
        getDataStation(2);
    }, [])

    return (
        <div className='dark:bg-gray-900'>
            <div className=" p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex flex-row sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">

                    <div className='flex flex-row'>
                        <div className="" onClick={() => getDataStation(2)}>
                            <div
                                className="h-9.5 w-40 flex items-center justify-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                Đang hoạt động
                            </div>
                        </div>
                        <div className="ml-3" onClick={() => getDataStation(3)}>
                            <div
                                className="h-9.5 w-40 flex items-center justify-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                Dừng hoạt động
                            </div>
                        </div>
                        <div className="ml-3" onClick={() => getDataStation(1)}>
                            <div
                                className="h-9.5 w-40 flex items-center justify-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                Chờ phê duyệt
                            </div>
                        </div>
                        <div className="ml-3" onClick={() => getDataStation(4)}>
                            <div
                                className="h-9.5 w-40 flex items-center justify-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                Bị từ chối
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for items"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                </div>
                            </th>
                            <th scope="col" className="pl-6 py-3 text-center" onClick={() => requestSort('name')}>
                                <div className="flex items-center justify-center">
                                    Tên trạm
                                    <div>
                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3" onClick={() => requestSort('location')}>
                                <div className="flex items-center justify-center">
                                    Địa chỉ
                                    <div>
                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3" onClick={() => requestSort('time')}>
                                <div className="flex items-center justify-center">
                                    Thời gian
                                    <div>
                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center justify-center" onClick={() => requestSort('brand_id.name')}>
                                    Hãng trạm sạc
                                    <div>
                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center justify-center" onClick={() => requestSort('address.name')}>
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
                            {number === 2 || number === 3 ?
                                <>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center justify-center">
                                            Hoạt động
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
                                        <img src={item.image} className="w-80 h-50 object-cover" />
                                    </td>
                                    <td className="text-center pl-6 py-4 w-50 font-medium text-gray-900 dark:text-white">
                                        {item.name}
                                    </td>
                                    <td className="pl-6 py-4 text-center w-60 font-medium text-gray-900 dark:text-white">
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

                                    {number === 2 || number === 3 ?
                                        <>
                                            <td className="px-6 py-4 text-center">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={isPaused}
                                                        // onChange={() => isPaused(false)}
                                                    />
                                                    <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition-all duration-300">
                                                        <div className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 
                                                                ${isPaused ? "translate-x-6" : "translate-x-0"}`}>
                                                        </div>
                                                    </div>
                                                </label>
                                            </td>
                                        </>
                                        :
                                        null
                                    }

                                    <td className="px-6 py-4 text-right">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Sửa</a>
                                    </td>

                                    {number === 1 ?
                                        <>
                                            <td className="px-6 py-4 text-right">
                                                <a className="font-medium text-green-500 dark:text-white text-2xl">✓</a>
                                            </td>
                                            <td className="px-6 py-4 text-right w-10">
                                                <a className="font-medium text-red-500 dark:text-white text-2xl">✗</a>
                                            </td>
                                        </>
                                        :
                                        null
                                    }
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
        </div >
    );
};

export default Test;