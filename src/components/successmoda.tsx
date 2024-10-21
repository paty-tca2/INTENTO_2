import React from 'react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'error';
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, onClose, message, type }) => {
  if (!isOpen) return null;

  const bgColor = type === 'success' ? 'bg-[#04d9b2]' : 'bg-red-500';
 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <p className="text-gray-700 font-geometos mb-6">{message}</p>
        <button
          onClick={onClose}
          className={`${bgColor} hover:opacity-90 text-white font-geometos py-2 px-4 rounded-full w-full`}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
