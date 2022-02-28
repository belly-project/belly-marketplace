import { Icon } from "@iconify/react";
import React from "react";

export default function NavbarItem({ icon, text, to, location, disabled }) {
  return (
    <a
      disabled
      className={`flex px-4 items-center ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${disabled && "text-[#232931] sm:hidden lg:flex"}
      } ${location === to ? "bg-[#232931]" : "bg-transparent"} mx-4`}
      href={disabled !== true ? to : undefined}
    >
      <Icon
        width={"1.02rem"}
        icon={icon}
        color={`${disabled ? "#232931" : "white"}`}
      />
      <h1 className="ml-2 hidden md:flex">{text}</h1>
    </a>
  );
}
