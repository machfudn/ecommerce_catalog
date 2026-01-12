import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaHome } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      <div className="text-center">
        {/* Icon Section */}
        <div className="flex justify-center mb-6">
          <HiOutlineExclamationCircle className="text-red-500 text-9xl animate-bounce" />
        </div>

        {/* Text Section */}
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-3xl font-semibold text-gray-600 mt-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-500 mt-2 mb-8">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>

        {/* Button Section */}
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg"
        >
          <FaHome />
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}

export default NotFound;
