import React from "react";
import ReactModal from "react-modal";

export default function BasicModal({ children, showModal, handleCloseModal }) {
  return (
    <ReactModal
      appElement={document.getElementsByClassName("App")}
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      contentLabel="Minimal Modal Example"
    >
      <div
        className="flex flex-col sm:flex-row items-center justify-between w-full align-center"
        style={{ width: "45vw" }}
      >
        {children}
      </div>
    </ReactModal>
  );
}
