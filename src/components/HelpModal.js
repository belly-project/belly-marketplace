import { Icon } from "@iconify/react";
import React from "react";
import ReactModal from "react-modal";

export default function HelpModal({ showModal, handleCloseModal }) {
  return (
    <ReactModal
      appElement={document.getElementsByClassName("App")}
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      contentLabel="Minimal Modal Example"
    >
      <>
        <Icon onClick={() => handleCloseModal()} icon="ep:close-bold" />
        <div className="flex flex-col justify-between align-center">
          <h1 className="text-xl text-white">Tutorial</h1>
          <div className=" flex my-5 items-center text-white"></div>
        </div>
      </>
    </ReactModal>
  );
}
