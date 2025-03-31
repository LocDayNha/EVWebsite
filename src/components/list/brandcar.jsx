import React, { useState, useEffect } from "react";
import AxiosInstance from '../../components/util/AxiosInstance';

const BrandCar = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isPaused, setIsPaused] = useState(false);

    const fetchBrandCars = async () => {
        try {
            const response = await AxiosInstance().get('/brandcar/getAll');

            if (response.data && response.data.length > 0) {
                setData(response.data);
                setFilteredData(response.data.filter(item => item.isActive));
            } else {
                setData([]);
                setFilteredData([]);
                console.error("Không tìm thấy dữ liệu");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu brand car:", error);
            setData([]);
            setFilteredData([]);
        }
    };

    const handleFilter = (isActive) => {
        setFilteredData(data.filter(item => item.isActive === isActive));
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearchTerm(keyword);
        if (keyword) {
            setFilteredData(data.filter(item => item.name.toLowerCase().includes(keyword)));
        } else {
            setFilteredData(data.filter(item => item.isActive));
        }
    };

    const handleToggleActive = async (id) => {
        try {
            const response = await AxiosInstance().post('/brandcar/activeUpdate', { id });

            console.log(response.data);
            if (response.data) {
                setData(prevData =>
                    prevData.map(item =>
                        item._id === id ? { ...item, isActive: !item.isActive } : item
                    )
                );
                setFilteredData(prevData =>
                    prevData.map(item =>
                        item._id === id ? { ...item, isActive: !item.isActive } : item
                    )
                );
            } else {
                console.error("Lỗi cập nhật trạng thái:", response.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };


    useEffect(() => {
        fetchBrandCars();
    }, []);

    return (
        <div className="p-4 shadow-md sm:rounded-lg overflow-x-auto">
            <div className="pb-4 flex justify-between items-center">
                <h2 className='text-gray-900 dark:text-white text-2xl'>Hãng xe</h2>
                <input
                    type="text"
                    className="p-2 border rounded w-80 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className='flex gap-3'>
                    <button className="px-4 py-2 border rounded bg-gray-50 dark:bg-gray-700" onClick={() => handleFilter(true)}>Đang hoạt động</button>
                    <button className="px-4 py-2 border rounded bg-gray-50 dark:bg-gray-700" onClick={() => handleFilter(false)}>Dừng hoạt động</button>
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Ảnh</th>
                        <th className="px-6 py-3 text-center">Tên hãng</th>
                        <th className="px-6 py-3 text-center">Hoạt động</th>
                        <th className="px-6 py-3 text-right">Sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-900 dark:text-white">Không có dữ liệu</td>
                        </tr>
                    ) : (
                        filteredData.map((item, index) => (
                            <tr key={index} className="border-b dark:border-gray-700">
                                <td className="pl-4 py-4"><img src={item.image} alt={item.name} className="w-12 h-12 object-cover" /></td>
                                <td className="text-center py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                                <td className="px-6 py-4 text-center">
                                    <input
                                        type="checkbox"
                                        checked={item.isActive}
                                        onChange={() => handleToggleActive(item._id)}
                                        className="cursor-pointer"
                                    />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 hover:underline">Sửa</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BrandCar;