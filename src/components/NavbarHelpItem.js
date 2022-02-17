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
      className={`flex items-center cursor-pointer hover:animate-spin ${
        disabled && "text-[#232931] cursor-not-allowed"
      } ${
        location === to ? "bg-[#232931]" : "bg-transparent"
      } mx-4 hidden md:flex`}
      onClick={!disabled ?  (() => setShowHelpModal(true)) : undefined}
    >
      <Icon
        width={"1.1rem"}
        icon={icon}
        color={`${disabled === "true" ? "#232931" : "#10c274"}`}
      />
      <h1 className="">{text}</h1>
      <HelpModal
        showModal={showHelpModal}
        handleCloseModal={() => setShowHelpModal(false)}
      />
    </button>
  );
}
