import React, { useState, useEffect } from "react";
import Select from "react-select";

const BrandCar = ({ data, search, isPaused, setIsPaused }) => {

    const [textSearch, setTextSearch] = useState(null);
    const [paused, setPaused] = useState(isPaused);

    const logData = () => {
        console.log('paused:', paused);
    }

    useEffect(() => {
        if (textSearch) {
            search(textSearch);
        } else {
            console.log('Không có KEY');
        }
    }, [textSearch])

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                        </div>
                    </th>
                    <th scope="col" className="pl-6 py-3 text-center" onClick={() => setTextSearch('name')}>
                        <div className="flex items-center justify-center">
                            Tên hãng
                            <div>
                                <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                            </div>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center justify-center">
                            Hoạt động
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Sửa</span>
                    </th>
                </tr>
            </thead>

            <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan="10" className="text-center py-4 text-gray-900 dark:text-white">
                            Không có dữ liệu
                        </td>
                    </tr>
                ) : (
                    data.map((item, index) => (

                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="pl-4 py-4">
                                <img src={item.image} className="w-12 h-12 object-cover" />
                            </td>
                            <td className="text-center pl-6 py-4 w-50 font-medium text-gray-900 dark:text-white">
                                {item.name}
                            </td>

                            <td className="px-6 py-4 text-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={paused}
                                        onChange={() => setPaused(!paused)}
                                    />
                                    <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition-all duration-300">
                                        <div className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 
                                                    ${paused ? "translate-x-6" : "translate-x-0"}`}>
                                        </div>
                                    </div>
                                </label>
                            </td>

                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Sửa</a>
                            </td>

                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default BrandCar;
