import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ItemPagePresentation({ detailItem }) {
  let navigate = useNavigate();

  return (
    <div className="flex flex-col h-fit">
      <div
        role="button"
        className="inline-flex items-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <Icon icon="bx:bx-arrow-back" color="white" />
      </div>
      <br />
      <div className="mt-4 leading-16 inline-flex item-center">
        <span className="flex px-8 rounded text-12  border border-transparent pt-1 pt-2 bg-primary-3 border-transparent">
          #{detailItem.tokenId}
        </span>
      </div>
      <div className=" pointer-events-none">
        <img
          className="mt-5  lg:w-full"
          src={detailItem.image}
          alt={detailItem.tokenId}
          style={{ minWidth: "300px", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
