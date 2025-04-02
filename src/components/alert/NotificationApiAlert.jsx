import React from 'react';
import { XCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const alertTypes = {
    error: {
        bg: 'bg-white',
        text: 'text-red-600',
        icon: <XCircle className="w-16 h-16 text-red-600" />,
        button: 'bg-red-600 hover:bg-red-700',
    },
    success: {
        bg: 'bg-white',
        text: 'text-green-600',
        icon: <CheckCircle className="w-16 h-16 text-green-600" />,
        button: 'bg-green-600 hover:bg-green-700',
    },
    info: {
        bg: 'bg-white',
        text: 'text-blue-600',
        icon: <Info className="w-16 h-16 text-blue-600" />,
        button: 'bg-blue-600 hover:bg-blue-700',
    },
    warn: {
        bg: 'bg-white',
        text: 'text-yellow-600',
        icon: <AlertTriangle className="w-16 h-16 text-yellow-600" />,
        button: 'bg-yellow-600 hover:bg-yellow-700',
    }
};

const NotificationApiAlert = ({ title, message, type, onCancel, onClose }) => {
    const alert = alertTypes[type] || alertTypes.warn;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="flex flex-col items-center p-6 rounded-2xl shadow-lg w-80 bg-white border-1 border-gray-300">
                <h2 className={'text-xl font-semibold mt-4 text-black'}>{title}</h2>
                <div className="mr-3">{alert.icon}</div>
                <p className=" px-4 py-2 text-gray-600 text-center mt-2">{message}</p>

                <button
                    className={`px-4 py-2 border-1 border-gray-300 rounded-lg w-30 `}
                    onClick={onClose}
                >
                    Xác Nhận
                </button>

            </div>
        </div>
    );
};

export default NotificationApiAlert;
