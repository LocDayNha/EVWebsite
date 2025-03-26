import React, { useState, useEffect } from 'react'
import Verify from '../../components/item/Verify'
import Button from '../../components/button/Button';
import { useNavigate, Link, useLocation } from "react-router-dom";
import NotificationAlert from '../../components/alert/NotificationAlert';
import AxiosInstance from '../../components/util/AxiosInstance';

const VerifyCode = () => {
    const navigate = useNavigate();
    const dataLocal = useLocation();
    const email = dataLocal.state?.email || "Không có email";
    const name = dataLocal.state?.name || "Không có name";

    const [alert, setAlert] = useState(null);

    const showToast = (type, message) => {

        if (alert?.timer) {
            clearTimeout(alert.timer);
        }

        const timer = setTimeout(() => {
            setAlert(null);
        }, 5000);

        setAlert({ type, message, timer });
    };

    const hideAlert = () => {
        if (alert?.timer) {
            clearTimeout(alert.timer);
        }

        setAlert(null);
    };

    const [countdown, setCountdown] = useState(30);
    const [otpValue, setOtpValue] = useState(null);
    const [otpOutPut, setOtpOutPut] = useState(4578);

    const [checkValidationInputVerify, setCheckValidationInputVerify] = useState(false);

    const validation = async () => {

        let isValidation = true;

        if (!otpValue || !/^\d{4}$/.test(otpValue)) {
            setCheckValidationInputVerify(true);
            isValidation = false;
            showToast('error', 'Mã OTP phải là 4 chữ số');
            return;
        } else {
            setCheckValidationInputVerify(false);
            return isValidation;
        }
    };

    const sentCode = async () => {
        try {
            const code = await AxiosInstance().post('/user/sent-code',
                {
                    email: email
                }
            );
            if (code && code.verifyCode) {
                setOtpOutPut(parseInt(code.verifyCode, 10));
                showToast('info', 'Kiểm tra mã xác nhận ở Email');
            } else {
                showToast('error', 'Gửi mã xác nhận thất bại');
            }
        } catch (error) {
            console.log('Lỗi:', error);
        }
    };

    const clickVerify = async () => {
        try {
            const isValidation = await validation();

            if (isValidation) {
                if (otpValue === otpOutPut) {
                    const response = await AxiosInstance().post('/user/verify',
                        {
                            codeInput: otpValue,
                            codeResult: otpOutPut,
                            email: email
                        }
                    );

                    if (response && name === 'Register') {
                        console.log('Xác nhận thành công');
                        navigate('/login');
                    } else if (response && name === 'Login') {
                        console.log('Xác nhận thành công');
                        navigate('/login');
                    } else if (response && name === 'ForgotPass') {
                        console.log('Xác nhận thành công');
                        navigate('/newpass', { state: { email: email } });
                    } else {
                        showToast('error', 'Xác thực thất bại');
                    }
                } else {
                    showToast('error', 'Mã xác thực không đúng');
                    setCheckValidationInputVerify(true);
                }
            } else {
                return;
            }
        } catch (error) {
            console.log('Lỗi:', error);
        }
    }

    useEffect(() => {
        sentCode();
    }, [])


    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                    <h2 className="text-2xl font-semibold text-center mb-4">
                        Xác minh
                    </h2>
                    <p className="text-gray-600 text-center text-sm mb-6">
                        Nhập mã gồm 4 chữ số mà bạn nhận được qua email.
                    </p>

                    <Verify onChange={setOtpValue} checkValidation={checkValidationInputVerify} />

                    <p
                        className={`${countdown > 20
                            ? "text-black"
                            : countdown > 10
                                ? "text-yellow-400"
                                : "text-red-400"
                            } text-sm font-medium text-center`}
                    >
                        {`00:${countdown < 10 ? `0${countdown}` : countdown}`}
                    </p>


                    <Button title='Tiếp tục' onClick={clickVerify} />

                    <p className="text-sm text-gray-600 mt-4 text-center">
                        Nếu bạn không nhận được mã ! {" "}
                        <button
                            className={`${countdown === 0 ? "text-red-400" : "text-gray-400 cursor-not-allowed"
                                } font-medium`}
                            disabled={countdown > 0}
                            onClick={() => {
                                sentCode();
                                setCountdown(30);
                            }}
                        >
                            Gửi lại mã
                        </button>
                    </p>
                </div>
                {alert && <NotificationAlert type={alert.type} message={alert.message} onClose={hideAlert} />}
            </div>
        </div >
    )
}

export default VerifyCode