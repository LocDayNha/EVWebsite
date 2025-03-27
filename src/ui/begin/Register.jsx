import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import imgBg from '../../assets/image/begin/register/bg.png';
import imgLogo from '../../assets/image/logo/logo.png';
import TextInputEmail from '../../components/textinput/Email';
import TextInputPassword from '../../components/textinput/Pasword';
import Button from '../../components/button/Button';
import NotificationAlert from '../../components/alert/NotificationAlert';
import AxiosInstance from '../../components/util/AxiosInstance';

const Register = () => {

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
    const [password2, setPassword2] = useState(null);

    const [checkValidationEmail, setCheckValidationEmail] = useState(false);
    const [checkValidationPassword, setCheckValidationPassword] = useState(false);
    const [checkValidationPassword2, setCheckValidationPassword2] = useState(false);

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

    const Register = async () => {
        try {
            let isValidation = await validation();

            if (isValidation) {
                const response = await AxiosInstance().post('/user/register',
                    { email: email, password: password, password2: password2 }
                );
                if (response && response.status) {
                    navigate('/verify', { state: { email: email, name: 'Register' } });
                } else {
                    showToast('error', 'Đăng ký thất bại');
                }
            } else {
                return;
            }
        } catch (error) {
            showToast('error', error.response?.data?.message || 'Có lỗi xảy ra');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
            <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl relative p-8">

                <div className="w-2/5">
                    <img src={imgBg} alt="Background" className="w-full h-full object-cover" />
                </div>

                <div className="w-3/5 p-6 flex flex-col items-center">
                    <div className="w-26 h-26 bg-gray-100 rounded-full mb-4">
                        <img src={imgLogo} className="w-26 h-26" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-6">Tạo tài khoản</h2>

                    <TextInputEmail title='Email' onChange={e => setEmail(e.target.value)} checkValidation={checkValidationEmail} />
                    <TextInputPassword title='Mật khẩu' onChange={e => setPassword(e.target.value)} checkValidation={checkValidationPassword} />
                    <TextInputPassword title='Nhập lại mật khẩu' onChange={e => setPassword2(e.target.value)} checkValidation={checkValidationPassword2} />

                    <Button title='Đăng ký' onClick={Register} />

                    <p className="mt-4 text-gray-600">Đã có tài khoản? <Link to='/login' className="text-blue-500 cursor-pointer">Đăng nhập</Link></p>
                </div>
            </div>
            {alert && <NotificationAlert type={alert.type} message={alert.message} onClose={hideAlert} />}
        </div>
    )
}

export default Register