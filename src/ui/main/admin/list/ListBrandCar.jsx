import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../../../components/util/AxiosInstance';
import Select from "react-select";
import Loading from '../../../../components/item/Loading';
import BrandCar from '../../../../components/list/brandcar';

const ListBrandCar = () => {

    const [data, setData] = useState([]);
    const [dataFil, setDataFil] = useState([]);

    const [sortConfig, setSortConfig] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    const [number, setNumber] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPaused, setIsPaused] = useState(null);
    const [searchKey, setSearchKey] = useState(null);

    const getData = async () => {
        try {
            setData([]);
            const dataBrandCar = await AxiosInstance().get('/brandcar/getAll');
            if (dataBrandCar.data && dataBrandCar.data.length > 0) {
                setData(dataBrandCar.data);
                const dataFiltered = dataBrandCar.data.filter(item => item.isActive === true);
                setDataFil(dataFiltered);
            } else {
                setData([]);
                console.log('Không tìm thấy dữ liệu từ /brandcar/getAll');
            }
        } catch (error) {
            setData([]);
            console.error('Lỗi khi lấy dữ liệu brand car:', error);
        }
    };

    const filteredData = (isActive) => {
        const dataFiltered = data.filter(item => item.isActive === isActive);
        setDataFil(dataFiltered);
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='drak:p-4 dark:bg-gray-900 w-1/3'>
            <div className="p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="pb-4 flex justify-between item-center">

                    <div className='text-gray-900 dark:text-white text-2xl'>Hãng xe</div>

                    <div>
                        {/* Tìm kiếm */}
                        <div className="flex items-center justify-between mb-4">
                            <div className='relative'>
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

                        {/* Điều hướng */}
                        <div className='flex flex-row items-center justify-between'>
                            <div className='flex flex-row items-center'>
                                <div className="" onClick={() => filteredData(true)}>
                                    <div
                                        className="h-9.5 w-38 flex items-center justify-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        Đang hoạt động
                                    </div>
                                </div>
                                <div className="ml-3" onClick={() => filteredData(false)}>
                                    <div
                                        className="h-9.5 w-39 flex items-center justify-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        Dừng hoạt động
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <BrandCar data={dataFil} number={number} isPaused={isPaused} search={setSearchKey} />

            </div>
        </div >
    );
}
export default ListBrandCar