import { Icon } from "@iconify/react";
import { Link } from "@mui/material";
import React from "react";

export default function NavbarItem({ icon, text, to, location }) {
  return (
    <a
      className={`flex px-4 items-center cursor-pointer bg-${
        location === to ? "[#232931]" : "transparent"
      } mx-4 hidden md:flex`}
      href={to}
    >
      <Icon icon={icon} color="white" />
      <h1 className="ml-2">{text}</h1>
    </a>
  );
}
