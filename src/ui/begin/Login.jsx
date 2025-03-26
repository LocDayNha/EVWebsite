import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import imgPhone from '../../assets/image/begin/login/phone.png';
import AppStore from '../../components/item/AppStore';
import GooglePlay from '../../components/item/GooglePlay';
import TextInputEmail from '../../components/textinput/Email';
import TextInputPassword from '../../components/textinput/Pasword';
import Button from '../../components/button/Button';
import NotificationAlert from '../../components/alert/NotificationAlert';
import AxiosInstance from '../../components/util/AxiosInstance';

const Login = () => {

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
    const [password, setPassword] = useState(null);

    const [checkValidationEmail, setCheckValidationEmail] = useState(false);
    const [checkValidationPassword, setCheckValidationPassword] = useState(false);

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
        }

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
            return isValidation;
        }
    }

    const Login = async () => {
        try {
            const isValidation = await validation();

            if (isValidation) {
                const response = await AxiosInstance().post('/user/login',
                    { email: email, password: password }
                );
                if (response && response.status && response.returnData.data && response.returnData.data.user.isVerified) {
                    const { token, user } = response.returnData.data;
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('token', JSON.stringify(token));
                    navigate('/home');
                } else if (response && response.status && response.returnData.data && response.returnData.data.user.isVerified === false) {
                    showToast('info', 'Cần xác thực tài khoản');
                    navigate('/verify', { state: { email: email, name: 'Login' } });
                } else {
                    showToast('error', 'Đăng nhập thất bại');
                }
            } else {
                return;
            }
        } catch (error) {
            showToast('error', error.response?.data?.message || 'Có lỗi xảy ra');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl">

                <div className="w-1/2 flex items-center justify-center bg-gray-200 p-4">
                    <img src={imgPhone} alt="Mockup Phones" className="max-h-96 object-contain" />
                </div>

                <div className="w-1/2 p-12 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
                    <h2 className="text-2xl font-semibold mb-6">Đăng nhập</h2>
                    <TextInputEmail title='Email' onChange={e => setEmail(e.target.value)} checkValidation={checkValidationEmail} />
                    <TextInputPassword title='Mật khẩu' onChange={e => setPassword(e.target.value)} checkValidation={checkValidationPassword} />
                    <Button title='Đăng nhập' onClick={Login} />

                    <div className='flex w-full items-center my-4'>
                        <div className='w-4/10 text-gray-500 border-t'></div>
                        <div className="w-2/10 text-center text-gray-500">Hoặc</div>
                        <div className='w-4/10 text-gray-500 border-t'></div>
                    </div>

                    <Link to='/forgotPass' className="text-sm text-blue-500">Quên mật khẩu?</Link>

                    <div className="mt-6 text-gray-600">
                        Chưa có tài khoản? <Link to='/register' className="text-blue-500 ">Đăng ký</Link>
                    </div>

                    {/* Nút tải ứng dụng */}
                    <div className="flex space-x-4 mt-4">
                        <AppStore />
                        <GooglePlay />
                    </div>
                    {alert && <NotificationAlert type={alert.type} message={alert.message} onClose={hideAlert} />}
                </div>
            </div>
        </div>
    )
}

export default Login