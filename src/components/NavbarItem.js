import { Icon } from "@iconify/react";
import React from "react";

export default function NavbarItem({ icon, text, to, location, disabled }) {
  return (
    <a
      disabled
      className={`flex px-4 items-center transition-colors  ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${disabled ? "text-gray-3 md:flex" : "hover:text-primary-4"}
      } ${location === to ? "bg-gray-3" : "bg-transparent"} mx-4`}
      href={disabled !== true ? to : undefined}
    >
      <Icon
        width={"1.02rem"}
        icon={icon}
        color={`${disabled ? "gray-3" : "white"}`}
      />
      <h1 className={`ml-2  ${location === to ? "flex" : "hidden"} sm:flex`}>
        {text}
      </h1>
    </a>
  );
}
