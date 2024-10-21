import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'error';
}

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onClose, message, type }) => {
  if (!isOpen) return null;

  const bgColor = type === 'success' ? 'bg-[#04d9b2]' : 'bg-red-500';
  const Icon = type === 'success' ? FaCheckCircle : FaTimesCircle;
  const title = type === 'success' ? 'Éxito' : 'Error';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden">
        <div className={`${bgColor} p-4 flex items-center justify-center`}>
          <Icon className="text-white text-4xl" />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-geometos text-center mb-4">{title}</h2>
          <p className="text-gray-700 text-center mb-6">{message}</p>
          <button
            onClick={onClose}
            className={`${bgColor} hover:opacity-90 text-white font-geometos py-2 px-4 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105`}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
