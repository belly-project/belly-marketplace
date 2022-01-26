import { Icon } from "@iconify/react";
import React from "react";

export default function ClassFilterItem({ icon, classText, color }) {
  return (
    <div className="cursor-pointer flex items-center text-md justify-center m-2 bg-[#3a3f50] rounded-md p-1 px-2">
      <Icon className="text-xl" icon={icon} color={color} />
      <span className="capitalize ml-2">{classText}</span>
    </div>
  );
}
