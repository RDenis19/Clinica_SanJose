// src/components/common/Modal.js
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Icono de cierre
import '../../styles/components/modal.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-button" onClick={onClose}>
          <AiOutlineClose />
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
