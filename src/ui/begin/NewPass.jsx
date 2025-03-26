import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import Button from '../../components/button/Button';
import TextInputPassword from '../../components/textinput/Pasword';
import NotificationAlert from '../../components/alert/NotificationAlert';
import AxiosInstance from '../../components/util/AxiosInstance';

const NewPass = () => {
    const navigate = useNavigate();
    const dataLocal = useLocation();
    const email = dataLocal.state?.email || "Không có email";

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

    const [password, setPassword] = useState(null);
    const [password2, setPassword2] = useState(null);

    const [checkValidationPassword, setCheckValidationPassword] = useState(false);
    const [checkValidationPassword2, setCheckValidationPassword2] = useState(false);

    const validation = async () => {

        let isValidation = true;

        if (!password || password.trim() <= 0) {
            setCheckValidationPassword(true);
            isValidation = false;
            showToast('error', 'Không được bỏ trống mật khẩu');
            return;
        } else if (password.length < 6) {
            setCheckValidationPassword(true);
            isValidation = false;
            showToast('error', 'Mật khẩu phải trên 6 ký tự');
            return;
        } else {
            setCheckValidationPassword(false);
        }

        if (!password2 || password2.trim() <= 0) {
            setCheckValidationPassword2(true);
            isValidation = false;
            showToast('error', 'Không được bỏ trống nhập lại mật khẩu');
            return;
        } else if (password2.length < 6) {
            setCheckValidationPassword2(true);
            isValidation = false;
            showToast('error', 'Nhập lại mật khẩu phải trên 6 ký tự');
            return;
        } else if (password2 !== password) {
            setCheckValidationPassword2(true);
            isValidation = false;
            showToast('error', 'Nhập lại mật khẩu không đúng');
            return;
        } else {
            setCheckValidationPassword2(false);
            return isValidation;
        }
    }

    const NewPassword = async () => {
        try {
            const isValidation = await validation();

            if (isValidation) {
                const response = await AxiosInstance().post('/user/forgotpass',
                    {
                        email: email, password: password, password2: password2
                    }
                );
                if (response) {
                    showToast('success', 'Cập nhật mật khẩu thành công');
                    navigate('/login');
                } else {
                    showToast('error', 'Cập nhật mật khẩu thất bại');
                }
            } else {
                return;
            }

        } catch (error) {
            console.log('Lỗi:', error);
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                    <h2 className="text-2xl font-semibold text-center mb-4">
                        Mật khẩu mới
                    </h2>
                    <p className="text-gray-600 text-center text-sm mb-6">
                        Đặt mật khẩu mới cho tài khoản của bạn để bạn có thể đăng nhập và truy cập tất cả các tính năng.
                    </p>

                    <TextInputPassword title='Mật khẩu' onChange={e => setPassword(e.target.value)} checkValidation={checkValidationPassword} />
                    <TextInputPassword title='Nhập lại mật khẩu' onChange={e => setPassword2(e.target.value)} checkValidation={checkValidationPassword2} />

                    <Button title='Tiếp tục' onClick={NewPassword} />
                </div>
                {alert && <NotificationAlert type={alert.type} message={alert.message} onClose={hideAlert} />}
            </div>
        </div >
    )
}

export default NewPass