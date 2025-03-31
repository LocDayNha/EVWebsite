import React, { useState, useEffect } from "react";
import AxiosInstance from '../../components/util/AxiosInstance';

const Address = ({ }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [checkActive, setCheckActive] = useState(false);
    const [textSearch, setTextSearch] = useState(null);

    const fetchBrandCars = async () => {
        try {
            const response = await AxiosInstance().get('/location/getAll');

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





    const handleToggleActive = async (id) => {
        try {
            const response = await AxiosInstance().post('/location/activeUpdate', { id });

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

    const handleFilter = () => {
        setFilteredData(data.filter(item => item.isActive === checkActive));
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

    useEffect(() => {
        fetchBrandCars();
    }, []);
    useEffect(() => {
        handleFilter();
    }, [checkActive]);

    useEffect(() => {
            if (textSearch) {
                setSearchKey(textSearch);
            } else {
                console.log('Không có KEY');
            }
        }, [textSearch])

    return (
        <div className="p-4 shadow-md sm:rounded-lg overflow-x-auto">
            <div className="pb-4 flex justify-between items-center">
                <h2 className='text-gray-900 dark:text-white text-2xl'>Vị trí đặt trạm sạc</h2>
                <input
                    type="text"
                    className="p-2 border rounded w-80 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className='flex gap-3'>
                    <button className="px-4 py-2 border rounded bg-gray-50 dark:bg-gray-700" onClick={() => setCheckActive(true)}>Đang hoạt động</button>
                    <button className="px-4 py-2 border rounded bg-gray-50 dark:bg-gray-700" onClick={() => setCheckActive(false)}>Dừng hoạt động</button>
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Ảnh</th>
                        <th scope="col" className="pl-6 py-3 text-center" onClick={() => setTextSearch('name')}>
                                    <div className="flex items-center justify-center">
                                        Tên vị trí
                                        <div>
                                            <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </th>
                        <th className="px-6 py-3 text-center">Trạng thái hoạt động</th>
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

export default Address;
