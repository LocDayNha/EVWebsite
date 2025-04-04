
import React from 'react'

const CheckBox = ({ dataL, selectedCheckBox, setSelectedCheckBox }) => {

    const handleCheckboxChange = (option) => {
        setSelectedCheckBox((prev) => {
            const isSelected = prev.some((item) => item._id === option._id);
            if (isSelected) {
                return prev.filter((item) => item._id !== option._id);
            } else {
                return [...prev, option];
            }
        });
    };

    // console.log("Selected CheckBox:", selectedCheckBox);
    return (
        <div>
            <ul className="py-2 space-y-2  max-h-170 overflow-y-auto">
                {dataL.map((data) => (
                    <li key={data._id}>
                        <div
                            onClick={() => handleCheckboxChange(data)}
                            className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg pl-5 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <div
                                className="flex items-center justify-between p-2 w-50">
                                <div className="flex items-center  p-2 rounded-sm hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-400">
                                    {data.image ?
                                        <img src={data.image} alt={data.name} className="w-5 h-5 ml-2" />
                                        :
                                        null
                                    }

                                    <label htmlFor={data._id} className="ms-2 text-sm font-medium cursor-pointer">
                                        {data.name}
                                    </label>
                                </div>
                                <div>
                                    <input
                                        id={data._id}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                        checked={selectedCheckBox.some((item) => item._id === data._id)}
                                        onChange={() => handleCheckboxChange(data)}
                                    />
                                </div>
                            </div>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CheckBox