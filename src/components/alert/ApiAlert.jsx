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

const ApiAlert = ({ type, title, message, onClose }) => {
    const alert = alertTypes[type] || alertTypes.error;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="flex flex-col items-center p-6 rounded-2xl shadow-lg w-80 bg-white">
                {alert.icon}
                <h2 className={`text-xl font-semibold mt-4 ${alert.text}`}>{title}</h2>
                <p className="text-gray-600 text-center mt-2">{message}</p>
                <button
                    className={`mt-4 px-4 py-2 text-white rounded-lg ${alert.button}`}
                    onClick={onClose}
                >
                    Ok
                </button>
            </div>
        </div>
    );
};

export default ApiAlert;
