import { Icon } from "@iconify/react";
import React from "react";

export default function ClassFilterItem({
  selected,
  icon,
  text,
  color,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex items-center ${
        selected ? "bg-gray-2" : "bg-primary-3"
      } text-md justify-center m-2  rounded-md p-1 px-2`}
    >
      <Icon className="text-xl" icon={icon} color={color} />
      <span className="capitalize ml-2">{text}</span>
    </div>
  );
}
