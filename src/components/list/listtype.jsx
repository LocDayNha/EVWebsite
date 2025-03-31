import React, { useState, useEffect } from "react";
import AxiosInstance from '../util/AxiosInstance';
import ConfirmAlert from "../alert/ConfirmAlert";
import Loading from "../item/Loading";
import NotificationApiAlert from "../alert/NotificationApiAlert";

const ListType = ({ title, content1, urlGetData, urlUpdateStatus, titleAlert, messageAlert }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState(null);
    const [textSearch, setTextSearch] = useState(null);
    const [statusIsActive, setStatusIsActive] = useState(true);
    const [checkAlertComfirm, setCheckAlertConfirm] = useState(false);
    const [id, setItemId] = useState(null);
    const [checkLoading, setCheckLoading] = useState(false);
    const [textMessage, setTextMessage] = useState(null);
    const [checkAlertNotification, setCheckAlertNotification] = useState(false);

    const getData = async () => {
        try {
            setCheckLoading(true);
            const response = await AxiosInstance().get(urlGetData);
            if (response.data && response.data.length > 0) {
                setData(response.data);
                setFilteredData(response.data.filter(item => item.isActive === statusIsActive));
                setCheckLoading(false);
            } else {
                setData([]);
                setFilteredData([]);
                console.error("Không tìm thấy dữ liệu");
                setTextMessage("Không tìm thấy dữ liệu");
                setCheckAlertNotification(true);
                setCheckLoading(false);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
            setTextMessage("Lỗi khi lấy dữ liệu", error);
            setData([]);
            setFilteredData([]);
            setCheckLoading(false);
        }
    };

    const updateIsActive = async (id) => {
        try {
            setCheckLoading(false);
            const response = await AxiosInstance().post(urlUpdateStatus, { id: id });

            if (response.data) {
                getData();
                setCheckLoading(false);
            } else {
                console.error("Lỗi cập nhật trạng thái:", response.data.message);
                setTextMessage("Lỗi cập nhật trạng thái:", response.data.message);
                setCheckAlertNotification(true);
                setCheckLoading(false);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            setTextMessage("Lỗi khi cập nhật trạng thái:", error);
            setCheckAlertNotification(true);
            setCheckLoading(false);
        }
    };

    const handleFilter = (isActive) => {
        setFilteredData(data.filter(item => item.isActive === isActive));
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearchTerm(keyword);
        if (keyword) {
            setFilteredData(
                data.filter(item =>
                    item.name.toLowerCase().includes(keyword.toLowerCase()) &&
                    item.isActive === statusIsActive
                )
            );
        } else {
            handleFilter(statusIsActive);
        }
    };


    const onComfirm = () => {
        setCheckAlertConfirm(false);
        updateIsActive(id);
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

    useEffect(() => {
        if (data.length > 0) {
            handleFilter(statusIsActive);
        }
    }, [statusIsActive]);

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="p-4 shadow-md sm:rounded-lg overflow-x-auto">
            {checkLoading ?
                <Loading /> :
                <>
                    <div className="pb-4 flex justify-between items-center">
                        <h2 className='text-gray-900 dark:text-white text-2xl'>{title}</h2>
                        <input
                            type="text"
                            className="p-2 border rounded w-80 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <div className='flex gap-3'>
                            <button className="px-4 py-2 border rounded bg-gray-50 dark:bg-gray-700" onClick={() => setStatusIsActive(true)}>Đang hoạt động</button>
                            <button className="px-4 py-2 border rounded bg-gray-50 dark:bg-gray-700" onClick={() => setStatusIsActive(false)}>Dừng hoạt động</button>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3"></th>
                                <th scope="col" className="pl-6 py-3 text-center" onClick={() => setTextSearch('name')}>
                                    <div className="flex items-center justify-center">
                                        {content1}
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
                            {sortedData.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-900 dark:text-white">Không có dữ liệu</td>
                                </tr>
                            ) : (
                                sortedData.map((item, index) => (
                                    <tr key={index} className="border-b dark:border-gray-700">
                                        <td className="pl-4 py-4">
                                            {item.image && item.image !== "" ? <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" /> : null}

                                        </td>
                                        <td className="text-center py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                                        <td className="px-6 py-4 text-center">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={item.isActive}
                                                    onChange={() => {
                                                        setCheckAlertConfirm(true);
                                                        setItemId(item._id);
                                                    }}
                                                />
                                                <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition-all duration-300">
                                                    <div className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 
                                                 ${item.isActive ? "translate-x-6" : "translate-x-0"}`}>
                                                    </div>
                                                </div>
                                            </label>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-600 hover:underline">Sửa</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                    {
                        checkAlertComfirm ?
                            <ConfirmAlert
                                title={titleAlert}
                                message={messageAlert}
                                onCancel={onCancel}
                                onComfirm={onComfirm}
                            /> :
                            null
                    }
                    {
                        checkAlertNotification ?
                            <NotificationApiAlert
                                title={'Thông báo server'}
                                message={textMessage}
                                onClose={onClose}
                            /> : null
                    }
                </>
            }
        </div>

    );
}

export default ListType