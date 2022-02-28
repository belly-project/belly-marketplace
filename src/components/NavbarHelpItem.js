import { Icon } from "@iconify/react";
import React from "react";
import HelpModal from "./HelpModal";

export default function NavbarHelpItem({
  icon,
  text,
  to,
  location,
  disabled,
  setShowHelpModal,
  showHelpModal,
  closeModal,
}) {
  return (
    <button
      className={`flex items-center  hover:animate-spin ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${disabled === true && "text-[#232931]"} ${
        location === to ? "bg-[#232931]" : "bg-transparent"
      } mx-4 hidden color-white`}
      onClick={!disabled ? () => setShowHelpModal(true) : undefined}
    >
      <Icon
        width={"1.1rem"}
        icon={icon}
        color={`${disabled ? "#232931" : "#10c274"}`}
      />
      <h1 className="">{text}</h1>
      <HelpModal
        showModal={showHelpModal}
        handleCloseModal={() => setShowHelpModal(false)}
      />
    </button>
  );
}
