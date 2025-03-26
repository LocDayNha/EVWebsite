import React, { useState } from 'react';
import ApiAlert from '../../components/alert/ApiAlert';

const Home = () => {

    const [alert, setAlert] = useState(null);

    const showToast = (type, title, message) => {

        if (alert?.timer) {
            clearTimeout(alert.timer);
        }

        const timer = setTimeout(() => {
            setAlert(null);
        }, 5000);

        setAlert({ type, title, message, timer });
    };

    const hideAlert = () => {
        if (alert?.timer) {
            clearTimeout(alert.timer);
        }

        setAlert(null);
    };

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={() => showToast('info', 'info','aaaaaaaaaaaaaaaaa')}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Nhấn để hiển thị type: 'info'
            </button>
            {alert && <ApiAlert type={alert.type}  title={alert.title} message={alert.message} onClose={hideAlert} />}
        </div>
    )
}

export default Home