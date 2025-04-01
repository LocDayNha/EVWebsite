import React from 'react';

const Error404 = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen dark:bg-gray-900 text-center">
      <div className=" text-left">
        <h1 className="text-5xl font-bold text-gray-900 mb-3 dark:text-white">Uh, ohh!</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-2 dark:text-white">Có gì đó đang sai ở đây</h2>
        <p className="text-gray-600 mt-4 dark:text-white">Chúng tôi không thể tìm thấy trang bạn đang tìm kiếm !</p>
        <a href="/" className="mt-6 inline-block bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-600 dark:bg-gray-600">
          Go Home
        </a>
      </div>

      <div className="flex justify-center ml-3 ">
        <img src="https://i.pinimg.com/736x/c3/29/56/c329567ecc69042c13c3cb6bc26ee424.jpg" alt="404 Illustration" className="w-50 h-50" />
      </div>
    </div>
  );
};

export default Error404;
