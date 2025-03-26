import React from 'react';
import { XCircle, Info, AlertTriangle, Ban, CheckCircle } from 'lucide-react';

const alertTypes = {
    info: {
        bg: 'bg-blue-100',
        border: 'border-blue-500',
        text: 'text-blue-700',
        icon: <Info className="w-6 h-6" />,
    },
    warn: {
        bg: 'bg-yellow-100',
        border: 'border-yellow-500',
        text: 'text-yellow-700',
        icon: <AlertTriangle className="w-6 h-6" />,
    },
    error: {
        bg: 'bg-red-100',
        border: 'border-red-500',
        text: 'text-red-700',
        icon: <Ban className="w-6 h-6" />,
    },
    success: {
        bg: 'bg-green-100',
        border: 'border-green-500',
        text: 'text-green-700',
        icon: <CheckCircle className="w-6 h-6" />,
    },
};

const NotificationAlert = ({ type, message, onClose }) => {
    const alert = alertTypes[type] || alertTypes.info;

    return (
        <div className={`fixed top-[80px] left-1/2 -translate-x-1/2 flex items-center w-96 p-4 border-l-4 rounded-lg z-50
                        transition-all duration-300 ease-in-out 
                        animate-fadeIn
                        ${alert.bg} ${alert.border} ${alert.text}`} div>
            <div className="mr-3">{alert.icon}</div>
            <span className="flex-1 text-sm font-medium">{message}</span>
            <button onClick={onClose} className="ml-3 text-gray-500 hover:text-gray-800">
                <XCircle className="w-5 h-5" />
            </button>
        </div>
    );
};

export default NotificationAlert;
