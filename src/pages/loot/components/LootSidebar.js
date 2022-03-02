import { Icon } from "@iconify/react";
import React from "react";
import { useContractsContext } from "../../../context/ContractProvider.js";

export default function LootSidebar({ setSection }) {
  const [{ wallet, balance }] = useContractsContext();

  const changeSection = (section) => {
    setSection(section);
  };

  return (
    <div
      className="hidden md:flex flex-col flex-none border-primary-3 border-r  bg-gray-6 bg-opacity-50"
      style={{ height: "100vh", width: "280px" }}
    >
      <div className="w-full flex flex-col pt-6 px-12">
        <div className="rounded w-full pt-5 pb-5 px-2 border border-primary-3 text-center">
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <h4 className="mr-4 text-lg font-medium">
                {wallet.substring(0, 5)}...
                {wallet.substring(wallet.length - 4)}
              </h4>
              <div className="hover:cursor-pointer">
                <Icon icon="bx:bx-edit" color="white" />
              </div>
            </div>
          </div>
          <small className="block mt-4 mb-4 text-gray-2 font-medium truncate"></small>
          <button className="px-2 py-2 relative rounded transition focus:outline-none border text-white border-gray-2 hover:border-gray-1 active:border-primary-3 bg-gray-5 hover:bg-gray-4 active:bg-gray-6">
            <span className="visible">
              <div className="flex items-center">
                <Icon icon="ri:copper-coin-fill" color="#cd7f32" />
                <span className="ml-2">{balance} BLY</span>
              </div>
            </span>
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col pt-2">
        <div className="flex-1 px-4">
          <div
            onClick={() => changeSection("crates")}
            className="relative mt-4 px-2 py-4 rounded flex flex-row items-center cursor-pointer bg-primary-3"
          >
            <Icon icon="ic:round-inventory-2" color="white" />
            <h6 className="ml-2 text-sx">Crates</h6>
          </div>
          <div
            /*  onClick={() => changeSection("chanceBid")} */
            className="relative mt-4 px-2 py-4 rounded flex flex-row items-center cursor-not-allowed"
          >
            <Icon icon="ph:activity-bold" color="#3a3f50" />
            <h6 className="ml-2 text-sx text-primary-3">Chance Bid</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
