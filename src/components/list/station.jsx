import React, { useState, useEffect } from "react";
import Select from "react-select";
import AxiosInstance from '../../components/util/AxiosInstance';
import Loading from '../../components/item/Loading';

const Station = ({ }) => {

    const [textSearch, setTextSearch] = useState(null);
    const [paused, setPaused] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState(null);
    const [dataStation, setDataStation] = useState([]);
    const [number, setNumber] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [isPaused, setIsPaused] = useState(null);
    const [searchKey, setSearchKey] = useState(null);

    const getDataStation = async (isActive) => {
        try {
            setIsLoading(true);
            setDataStation([]);
            const dataStation = await AxiosInstance().post('/station/getByActive', { isActive: isActive });
            if (dataStation.data && dataStation.data.length > 0) {
                setDataStation(dataStation.data);
                setIsLoading(false);
            } else {
                setDataStation([]);
                setIsLoading(false);
                console.log('Không tìm thấy dữ liệu từ /station/getByActive');
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Lỗi khi lấy dữ liệu station:', error);
        }
    };

    const updateStatusStation = async ({ id, isActive }) => {
        try {
            setIsLoading(true);
            const response = await AxiosInstance().post('/station/updateisActive', {
                id: id, isActive: isActive
            });
            if (response) {
                console.log('Cập nhật trạng thái thành công')
                getDataStation(number)
                setIsLoading(false);
            }

        } catch (error) {
            setIsLoading(false);
            console.error('Lỗi khi lấy dữ liệu station:', error);
        }
    };


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
        getDataStation(number);
    }, [number])

    useEffect(() => {
        if (searchKey) {
            requestSort(searchKey);
        } else {
            console.log('Không có key');
        }
    }, [searchKey])
    const logData = () => {
        console.log('paused:', paused);
    }

    useEffect(() => {
        if (textSearch) {
            setSearchKey(textSearch);
        } else {
            console.log('Không có KEY');
        }
    }, [textSearch])

    return (
        <div className='drak:p-4 dark:bg-gray-900'>
            {isLoading ?
                <Loading />
                :
                <div className="p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="flex flex-row sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                        {/* Điều hướng */}
                        <div className='flex flex-row'>
                            <div className="" onClick={() => setNumber(2)}>
                                <div
                                    className="h-9.5 w-40 flex items-center justify-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    Đang hoạt động
                                </div>
                            </div>
                            <div className="ml-3" onClick={() => setNumber(4)}>
                                <div
                                    className="h-9.5 w-40 flex items-center justify-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    Dừng hoạt động
                                </div>
                            </div>
                            <div className="ml-3" onClick={() => setNumber(1)}>
                                <div
                                    className="h-9.5 w-40 flex items-center justify-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    Chờ phê duyệt
                                </div>
                            </div>
                            <div className="ml-3" onClick={() => setNumber(3)}>
                                <div
                                    className="h-9.5 w-40 flex items-center justify-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    Bị từ chối
                                </div>
                            </div>
                        </div>
                        {/* Tìm kiếm */}
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
                                            <img src={item.image} className="w-80 h-50 object-cover" />
                                        </td>
                                        <td className="text-center pl-6 py-4 w-50 font-medium text-gray-900 dark:text-white" onClick={logData}>
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

                                        {item.isActive === 2 || item.isActive === 4 ?
                                            <>
                                                <td className="px-6 py-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.isActive === 2}
                                                        onChange={() => {
                                                            const isActive = item.isActive === 2 ? 4 : 2;
                                                            const id = item._id;
                                                            updateStatusStation({ id, isActive });
                                                        }}
                                                        className="w-6 h-6 cursor-pointer"
                                                    />
                                                </td>

                                            </>
                                            :
                                            null
                                        }

                                        <td className="px-6 py-4 text-right">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Sửa</a>
                                        </td>

                                        {item.isActive === 1 ?
                                            <>
                                                <td
                                                    onClick={() => {
                                                        const isActive = 2;
                                                        const id = item._id;
                                                        updateStatusStation({ id, isActive });
                                                    }}
                                                    className="px-6 py-4 text-right">
                                                    <a className="font-medium text-green-500 dark:text-white text-2xl">✓</a>
                                                </td>
                                                <td
                                                    onClick={() => {
                                                        const isActive = 3;
                                                        const id = item._id;
                                                        updateStatusStation({ id, isActive });
                                                    }}
                                                    className="px-6 py-4 text-right w-10">
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
            }
        </div >

    );
};

export default Station;
