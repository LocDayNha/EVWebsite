import React, { useState, useEffect } from "react";

const CheckBox = (props) => {

  const { data, selectedData } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCheckBox, setSelectedCheckBox] = useState([]);

  const handleCheckboxChange = (option) => {
    setSelectedCheckBox((prev) => {
      if (prev.some((item) => item._id === option._id)) {
        return prev.filter((item) => item._id !== option._id);
      } else {
        return [...prev, option];
      }
    });
  };

  useEffect(() => {
    selectedData?.(selectedCheckBox);
  }, [selectedCheckBox, selectedData]);

  return (
    <div className="w-full mt-1">
      <span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Check Box</span>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full dark:text-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 flex justify-between items-center dark:bg-gray-600 dark:hover:bg-gray-700"
        type="button"
      >
        <span>
          {selectedCheckBox.length > 0
            ? `Đã chọn ${selectedCheckBox.length} mục`
            : "Chưa chọn"}
        </span>
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
          <ul className="p-3 space-y-1 text-sm text-gray-700">
            {data.map((option) => (
              <li key={option._id}>
                <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 cursor-pointer">
                  <input
                    id={option._id}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    checked={selectedCheckBox.some((item) => item._id === option._id)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  {option.image ?
                    <img src={option.image} alt={option.name} className="w-5 h-5 ml-2" />
                    :
                    null
                  }

                  <label htmlFor={option._id} className="ms-2 text-sm font-medium cursor-pointer">
                    {option.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CheckBox;
