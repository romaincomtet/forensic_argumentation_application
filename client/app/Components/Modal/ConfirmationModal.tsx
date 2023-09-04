import React from "react";
import Modal from "./Modal";
import Button from "../Button";

interface IConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cancelButtonText: string;
  confirmButtonText: string;
  titleModal: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  cancelButtonText,
  confirmButtonText,
  titleModal,
}: IConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titleModal}>
      <div className="flex justify-between">
        <Button onClick={onClose}>{cancelButtonText}</Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
