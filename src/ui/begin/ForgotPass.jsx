import React, { useState } from 'react'
import TextInputEmail from '../../components/textinput/Email';
import Button from '../../components/button/Button';
import { useNavigate, Link } from "react-router-dom";
import NotificationAlert from '../../components/alert/NotificationAlert';
import AxiosInstance from '../../components/util/AxiosInstance';

const ForgotPass = () => {
    const navigate = useNavigate();

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

    const [email, setEmail] = useState(null);

    const [checkValidationEmail, setCheckValidationEmail] = useState(false);

    const validation = async () => {

        let isValidation = true;

        const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || email.trim() <= 0) {
            setCheckValidationEmail(true);
            isValidation = false;
            showToast('error', 'Không được bỏ trống Email');
            return;
        } else if (!emailRegex.test(email)) {
            setCheckValidationEmail(true);
            isValidation = false;
            showToast('error', 'Email không hợp lệ');
            return;
        } else {
            setCheckValidationEmail(false);
            return isValidation;
        }
    }

    const SentCode = async () => {
        try {
            const isValidation = await validation();

            if(isValidation){
                navigate('/verify', { state: { email: email, name: 'ForgotPass' } });
            }else{
                return;
            }
        } catch (error) {
            console.log('Lỗi:',error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Quên mật khẩu?
                </h2>
                <p className="text-gray-600 text-center text-sm mb-6">
                    Nhập email của bạn để xác minh, chúng tôi sẽ gửi mã gồm 4 chữ số đến email của bạn.
                </p>

                <TextInputEmail title='Email' onChange={e => setEmail(e.target.value)} checkValidation={checkValidationEmail} />
                <Button title='Tiếp tục' onClick={SentCode} />
            </div>
            {alert && <NotificationAlert type={alert.type} message={alert.message} onClose={hideAlert} />}
        </div>
    )
}

export default ForgotPass