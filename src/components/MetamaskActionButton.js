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
        style={{ borderColor: "#3a3f50" }}
        className={`${className} px-4 py-4 relative rounded ${
          disabled ? "cursor-not-allowed" : "text-white"
        } transition border text-xs md:text-base `}
      >
        <div className="flex items-center">
          <Icon icon="logos:metamask-icon" color="white" />
          <p className={`ml-2 ${disabled ? "text-[#6b7185]" : "text-white"}`}>
            {text}
          </p>
        </div>
      </button>
      {Modal && Modal}
    </>
  );
}
