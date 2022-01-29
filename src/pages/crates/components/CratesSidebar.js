import { Icon } from "@iconify/react";
import React from "react";
import { useContractsContext } from "../../../context/ContractProvider";

export default function CratesSidebar() {
  const [{ wallet, balance }] = useContractsContext();
  return (
    <div
      className="hidden md:flex flex-col flex-none border-[#3a3f50] border-r"
      style={{ height: "94vh", width: "280px" }}
    >
      <div className="w-full flex flex-col pt-6 px-12">
        <div className="rounded w-full pt-5 pb-5 px-2 border border-[#3a3f50] text-center">
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <h4 className="mr-4 text-lg font-medium">
                {wallet.substring(0, 4)}...
                {wallet.substring(wallet.length - 4)}
              </h4>
              <div className="hover:cursor-pointer">
                <Icon icon="bx:bx-edit" color="white" />
              </div>
            </div>
          </div>
          <small className="block mt-4 mb-4 text-gray-2 font-medium truncate"></small>
          <button className="px-2 py-2 relative rounded transition focus:outline-none border text-white border-gray-2 hover:border-[#a1a6b6] active:border-[#3a3f50] bg-gray-5 hover:bg-gray-4 active:bg-gray-6">
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
       
      
      </div>
    </div>
  );
}
