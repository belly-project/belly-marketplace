import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { getClassIcon, processWeapon } from "../context/utils";

export default function BuyableItemWrapper({ children }) {
  return (
    <div className="block max-w-md md:inline-block md:w-50 align-top">
      {children}
    </div>
  );
}
