import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io"; // Import Icon Close

const Modal = ({ isOpen, onClose, title, children, size = "max-w-md" }) => {
  const modalRef = useRef();

  // Fungsi deteksi klik di luar modal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className={`bg-white rounded-xl shadow-2xl w-full ${size} overflow-hidden animate-in zoom-in duration-200`}
      >
        <div className="flex justify-between items-center p-4 border-b-gray-400 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-700">{title}</h3>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-500 transition"
          >
            <IoMdClose />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
