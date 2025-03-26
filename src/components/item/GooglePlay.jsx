import React from 'react';
import googlePlayLogo from "../../assets/image/item/google-play.png";

const GooglePlay = () => {
  return (
    <div className='w-auto mt-3.5'>
      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center bg-black text-white px-4 py-2 rounded-xl shadow-md border border-gray-700 hover:opacity-80 transition"
      >
        <img src={googlePlayLogo} alt="Google Play" className="w-6 h-6 mr-2" />
        <div className="text-left">
          <p className="text-[10px] font-light uppercase">Get it on</p>
          <p className="text-sm font-semibold">Google Play</p>
        </div>
      </a>
    </div>
  )
}

export default GooglePlay