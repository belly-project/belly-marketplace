import { Icon } from "@iconify/react";
import React from "react";

export default function NavbarItem({ icon, text, to, location, disabled }) {
  return (
    <a
      disabled
      className={`flex px-4 items-center cursor-pointer ${
        disabled && "text-[#232931] cursor-not-allowed"
      } ${
        location === to ? "bg-[#232931]" : "bg-transparent"
      } mx-4 hidden md:flex`}
      href={disabled !== true ? to : undefined}
    >
      <Icon
        width={"1.1rem"}
        icon={icon}
        color={`${disabled ? "#232931" : "white"}`}
      />
      <h1 className="ml-2">{text}</h1>
    </a>
  );
}
