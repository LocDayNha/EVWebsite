import React, { useEffect, useState } from "react";
import TimePicker from "../dropdown/TimePicker";


const TimeStation = ({ timeStation, setTimeStation }) => {

    const [timeStart, setTimeStart] = useState(null);
    const [timeEnd, setTimeEnd] = useState(null);
    const [checkButton, setCheckButton] = useState(false);
    useEffect(() => {
        if (checkButton) {
            setTimeStation('24/7')
        }
        else {
            setTimeStation(timeStart + ' - ' + timeEnd)
        }

    }, [timeStart, timeEnd, checkButton]);

    return (
        <div className='w-full mt-1'>
            <div>
                <p className='text-gray-700 after:ml-0.5 after:text-red-500 after:content-["*"] dark:text-white'>
                    Thời gian hoạt động
                </p>
            </div>
            <div className=' flex justify-between items-center'>
                <div className='items-center justify-center'>
                    <p className='text-center'>
                        24/7
                    </p>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={checkButton}
                            onChange={() => {
                                setCheckButton(!checkButton);
                            }}
                        />
                        <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition-all duration-300">
                            <div className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 
                    ${checkButton ? "translate-x-6" : "translate-x-0"}`}>
                            </div>
                        </div>
                    </label>
                </div>

                <div className="flex">
                    <TimePicker title="Thời gian bắt đầu" formattedTime={timeStart} setFormattedTime={setTimeStart} />
                </div>
                <div className="flex">
                    <TimePicker title="Thời gian kết thúc" formattedTime={timeEnd} setFormattedTime={setTimeEnd} />
                </div>
            </div>
        </div>


    );
};

export default TimeStation;
