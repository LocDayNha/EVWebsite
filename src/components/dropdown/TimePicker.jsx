import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Custom input để chặn gõ
const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <input
    ref={ref}
    value={value}
    onClick={onClick}
    placeholder="Chọn giờ"
    readOnly
    style={{ cursor: "pointer" }}
  />
));

const TimePicker = ({formattedTime,setFormattedTime,title}) => {
  const [selectedTime, setSelectedTime] = useState(null);
  

  const handleTimeChange = (time) => {
    setSelectedTime(time);

    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    setFormattedTime(`${hours}:${minutes}`);
  };

  return (
    <div>
        <div>
            <p>
                {title}
            </p>
        </div>
      <DatePicker
        selected={selectedTime}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption="Giờ"
        dateFormat="HH:mm"
        timeFormat="HH:mm"
        customInput={<CustomInput />}
      />

      {/* Hiển thị giá trị đã format */}
      {/* {formattedTime && (
        <p>Giờ đã chọn: <strong>{formattedTime}</strong></p>
      )} */}
    </div>
  );
};

export default TimePicker;
