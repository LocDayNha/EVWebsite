import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../../../components/util/AxiosInstance';
import Select from "react-select";
import Loading from '../../../../components/item/Loading';
import Station from '../../../../components/list/station';

const ListStation = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [dataStation, setDataStation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState(2);

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
  const filteredData = dataStation.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand_id.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.address.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getDataStation(number);
  }, [number])

  return (
    <div className='drak:p-4 dark:bg-gray-900 '>
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
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
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

          <Station
            filteredData={filteredData}
            number={number}
            setNumber={setNumber}
            getData={getDataStation}
          />

        </div>
      }
    </div >
  )
}

export default ListStation
