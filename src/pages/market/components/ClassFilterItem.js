import { Icon } from "@iconify/react";
import React from "react";

export default function ClassFilterItem({
  selected,
  icon,
  classText,
  color,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex items-center ${
        selected ? "bg-[#6b7185]" : "bg-[#3a3f50]"
      } text-md justify-center m-2  rounded-md p-1 px-2`}
    >
      <Icon className="text-xl" icon={icon} color={color} />
      <span className="capitalize ml-2">{classText}</span>
    </div>
  );
}
