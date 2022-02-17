import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CrateItemPresentation({ detailItem }) {
  const navigate = useNavigate();
  return (
    <div className="block align-top" style={{ top: "120px" }}>
      <div
        role="button"
        className="inline-flex items-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <Icon icon="bx:bx-arrow-back" color="white" />
      </div>
      <br />
      <div className="mt-8 leading-16 inline-flex item-center">
        <span className="flex px-8 rounded text-12  border border-transparent pt-1 pt-2, bg-[#3a3f50] border-transparent">
          {detailItem.crateId}
        </span>
      </div>
      <div className="text-28 flex items-end"></div>
      <div className="w-full my-auto">
        <div
          className="relative pointer-events-none"
          style={{ width: "480px", height: "480px", marginLeft: "30px" }}
        >
          <img
            className="mt-5"
            src={detailItem.img}
            alt={detailItem.crateId}
            width="480"
            height="480"
          />
        </div>
      </div>
    </div>
  );
}
