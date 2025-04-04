import React from 'react';
import appleLogo from "../../assets/image/item/apple.png";

const AppStore = () => {
    return (
        <div className='w-auto mt-3.5'>
            <a
                href="*"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mt-3.5 bg-black text-white px-4 py-2 rounded-xl shadow-md border border-gray-700 hover:opacity-80 transition"
            >
                <img src={appleLogo} alt="App Store" className="w-6 h-6 mr-2" />
                <div className="text-left">
                    <p className="text-[10px] font-light uppercase">Download on the</p>
                    <p className="text-sm font-semibold">App Store</p>
                </div>
            </a>
        </div>
    )
}

export default AppStore