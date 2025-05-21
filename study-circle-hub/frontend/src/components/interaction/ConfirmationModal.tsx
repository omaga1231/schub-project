import React from 'react';
import Modal from '../ui/Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info'
}) => {
  const typeClasses = {
    danger: 'bg-red-50 text-danger',
    warning: 'bg-yellow-50 text-yellow-700',
    info: 'bg-blue-50 text-info'
  };

  const confirmButtonClasses = {
    danger: 'bg-danger hover:bg-red-600',
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    info: 'bg-primary hover:bg-primary-dark'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={`p-6 rounded-t-lg ${typeClasses[type]}`}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2">{message}</p>
      </div>
      <div className="p-6 bg-white rounded-b-lg">
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white rounded-md transition-colors ${confirmButtonClasses[type]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;

