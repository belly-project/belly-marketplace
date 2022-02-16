import { Icon } from "@iconify/react";
import React from "react";

export default function NavbarItem({ icon, text, to, location, disabled }) {
  return (
    <a
      className={`flex px-4 items-center cursor-pointer ${
        disabled && "text-[#232931]"
      } ${
        location === to ? "bg-[#232931]" : "bg-transparent"
      } mx-4 hidden md:flex`}
      href={!disabled && to}
    >
      <Icon icon={icon} color={`${disabled ? "#232931" : "white"}`} />
      <h1 className="ml-2">{text}</h1>
    </a>
  );
}
