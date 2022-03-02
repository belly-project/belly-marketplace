import { Icon } from "@iconify/react";
import React from "react";

export default function MetamaskActionButton({
  handleOpenModal,
  _onClick,
  text,
  Modal,
  className,
  disabled,
}) {
  return (
    <>
      <button
        disabled={disabled}
        onClick={() => _onClick()}
        className={`${className} px-4 py-4 relative rounded ${
          disabled ? "cursor-not-allowed" : "text-white"
        } transition border border-primary-1 hover:border-primary-4  text-xs md:text-base `}
      >
        <div className="flex items-center">
          <Icon icon="logos:metamask-icon" color="white" />
          <p className={`ml-2 ${disabled ? "text-gray-2" : "text-white"}`}>
            {text}
          </p>
        </div>
      </button>
      {Modal && Modal}
    </>
  );
}
