import React from "react";
import "./confirmationModal.css";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this journal entry?</p>
        <div className="confirmation-modal-buttons">
          <button onClick={onConfirm} className="confirm-button">
            Delete
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
