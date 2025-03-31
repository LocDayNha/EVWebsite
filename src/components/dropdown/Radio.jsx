import React, { useState, useEffect } from "react";

const Radio = (props) => {

  const { data, selectedData, checkValidation } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);

  useEffect(() => {
    selectedData?.(selectedRadio);
  }, [selectedRadio, selectedData]);

  return (
    <div className="w-full mt-1">
      <span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">{props.title}</span>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full dark:text-white border ${checkValidation === true ? "border-red-500" : "border-gray-300"} font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-between items-center dark:bg-gray-600 dark:hover:bg-gray-700`}
        type="button"
      >
        <div className="flex">
          {selectedRadio?.image ?
            <img src={selectedRadio.image} alt={selectedRadio.image} className="w-5 h-5 mr-2" />
            :
            null
          }
          <span>{selectedRadio?.name || 'Chưa chọn'}</span>
        </div>
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
          <ul className="p-3 space-y-1 text-sm text-gray-700">
            {data.map((option) => (
              <li key={option._id}>
                <div className="flex items-center p-2 rounded-sm hover:bg-gray-100">
                  <input
                    id={option._id}
                    type="radio"
                    name="radio-group"
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    checked={selectedRadio?._id === option._id}
                    onChange={() => {
                      setSelectedRadio(option);
                      setIsOpen(false);
                    }}
                  />
                  {option.image ?
                    <img src={option.image} alt={option.name} className="w-5 h-5 ml-2" />
                    :
                    null
                  }

                  <label htmlFor={option._id} className="w-full ms-2 text-sm font-medium">
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

export default Radio;
