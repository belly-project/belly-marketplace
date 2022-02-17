import { Icon } from "@iconify/react";
import React, { useState } from "react";
import BuyableItemWrapper from "../../../components/BuyableItemWrapper.js";
import { useContractsContext } from "../../../context/ContractProvider.js";
import CrateActionContainer from "./CrateActionContainer.js";

export default function CrateItem({ detailItem }) {
  return (
    <div className="mt-20 pb-20 sm:pb-32 hover:border:">
      <div className="mx-auto px-16 flex justify-center">
        <div
          className="block md:sticky md:inline-block md:w-1/2 align-top"
          style={{ top: "120px" }}
        >
          <div
            role="button"
            className="inline-flex items-center cursor-pointer"
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
        <BuyableItemWrapper>
          <CrateActionContainer detailItem={detailItem} />
        </BuyableItemWrapper>
      </div>
    </div>
  );
}
