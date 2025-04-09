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
            if (timeStart && timeEnd) {
                setTimeStation(timeStart + ' - ' + timeEnd)
            } else {
                setTimeStation(null);
            }
        }

    }, [timeStart, timeEnd, checkButton]);

    return (
        <div className='w-full'>
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

                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={checkButton}
                            onChange={() => {
                                setCheckButton(!checkButton);
                            }}
                        />
                        <div className="w-14 h-8 bg-gray-300 peer peer-checked:bg-blue-600 rounded-full transition-all duration-300 flex items-center">
                            <div className={`w-6 h-6 bg-white rounded-full transition-transform
                                                ${checkButton ? "translate-x-7" : "translate-x-1"}`}>
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
