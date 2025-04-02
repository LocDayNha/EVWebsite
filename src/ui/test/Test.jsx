import React, { useState, useEffect } from "react";

const Test = ({ title, selectedData, checkValidation, value }) => {

    const data = [
        {
            "_id": "1",
            "name": "Option 1",
            "image": "https://i.pinimg.com/736x/1f/08/01/1f0801f016d231441cd2d49060912135.jpg"
        },
        {
            "_id": "2",
            "name": "Option 2",
            "image": "https://i.pinimg.com/736x/1f/08/01/1f0801f016d231441cd2d49060912135.jpg"
        },
        {
            "_id": "3",
            "name": "Option 3",
            "image": "https://i.pinimg.com/736x/1f/08/01/1f0801f016d231441cd2d49060912135.jpg"
        },
        {
            "_id": "4",
            "name": "Option 4",
            "image": "https://i.pinimg.com/736x/1f/08/01/1f0801f016d231441cd2d49060912135.jpg"
        },
        {
            "_id": "5",
            "name": "Option 5",
            "image": "https://i.pinimg.com/736x/1f/08/01/1f0801f016d231441cd2d49060912135.jpg"
        },
        {
            "_id": "6",
            "name": "Option 6",
            "image": "https://i.pinimg.com/736x/1f/08/01/1f0801f016d231441cd2d49060912135.jpg"
        },
        {
            "_id": "7",
            "name": "Option 7",
            "image": "https://i.pinimg.com/736x/1f/08/01/1f0801f016d231441cd2d49060912135.jpg"
        },
        {
            "_id": "8",
            "name": "Option 8",
            "image": "https://i.pinimg.com/736x/1f/08/01/1f0801f016d231441cd2d49060912135.jpg"
        },
        {
            "_id": "9",
            "name": "Option 9",
            "image": "https://i.pinimg.com/736x/1f/08/01/1f0801f016d231441cd2d49060912135.jpg"
        },
        {
            "_id": "10",
            "name": "Option 10",
            "image": "https://i.pinimg.com/736x/1f/08/01/1f0801f016d231441cd2d49060912135.jpg"
        }
    ];


    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(value || null);

    useEffect(() => {
        selectedData?.(selectedItem);
    }, [selectedItem, selectedData]);

    useEffect(() => {
        setSelectedItem(value);
    }, [value]);

    return (
        <div className="w-full mt-1 relative">
            <span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">
                {title}
            </span>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-white mt-1 dark:text-white border ${checkValidation ? "border-red-500" : "border-gray-300"} font-medium rounded-lg text-sm px-5 py-2.5 flex justify-between items-center dark:bg-gray-600 dark:hover:bg-gray-700`}
                type="button"
            >
                <div className="flex items-center">
                    {selectedItem?.image && (
                        <img src={selectedItem.image} alt={selectedItem.name} className="w-5 h-5 mr-2" />
                    )}
                    <span>{selectedItem?.name || 'Chưa chọn'}</span>
                </div>
                <svg className="w-2.5 h-2.5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-600 z-10">
                    <ul className="p-2 space-y-1 text-sm text-gray-700 dark:text-white">
                        {data.map((option) => (
                            <li
                                key={option._id}
                                className="flex items-center p-2 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400"
                                onClick={() => {
                                    setSelectedItem(option);
                                    setIsOpen(false);
                                }}
                            >
                                {option.image && (
                                    <img src={option.image} alt={option.name} className="w-5 h-5 mr-2" />
                                )}
                                <span>{option.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Test;
