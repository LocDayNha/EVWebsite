import React, { useState, useRef, useEffect } from 'react'

const Verify = (props) => {
    const { onChange, checkValidation } = props;
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    useEffect(() => {
        const otpCode = otp.join("");
        const otpNumber = parseInt(otpCode, 10);
        onChange(otpNumber);
    }, [otp, onChange]);

    return (
        <div className='w-auto m-2'>
            <div className="flex justify-center space-x-4 p-4">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={`w-14 h-14 border-1 rounded-lg text-center text-xl font-bold focus:outline-none focus:border-blue-500 ${checkValidation ? "border-red-500" : "border-gray-500"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Verify