import { Icon } from "@iconify/react";
import React from "react";

export default function MetamaskActionButton({
  handleOpenModal,
  _onClick,
  text,
  Modal,
  className,
}) {
  return (
    <>
      <button
        onClick={() => _onClick()}
        style={{ borderColor: "[#3a3f50]" }}
        className={`${className} px-4 py-4 relative rounded transition  border text-gray-2`}
      >
        <div className="flex items-center">
          <Icon icon="logos:metamask-icon" color="white" />
          <p className="ml-2 text-white">{text}</p>
        </div>
      </button>
      {Modal && Modal}
    </>
  );
}
