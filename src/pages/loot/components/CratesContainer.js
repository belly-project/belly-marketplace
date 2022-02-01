import { parseEther } from "ethers/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import { marketplaceApi } from "../../../context/axios";
import { useContractsContext } from "../../../context/ContractProvider";

export default function CratesContainer({ setSection, setDetailItem }) {
  const goToOpenCrate = () => {
    setSection("crateItem");
    setDetailItem({
      crateId: 1,
      img: "https://i.redd.it/udq9asephmpy.png",
      price: 10,
    });
  };

  return (
    <div className="flex mt-8 flex-wrap justify-center w-full">
      <div className="flex flex-col justidy-center  p-2 m-2 bg-[#282b39]">
        <img src="https://i.redd.it/udq9asephmpy.png" alt="dfaf"></img>

        <div>
          <h4 className="uppercase text-[#a1a6b6]">Simple Crate</h4>
          <div className="flex justify-between align-center mt-2">
            <div className="">10 BLY </div>
            <button
              onClick={() => goToOpenCrate()}
              className="bg-[#6b7185] p-2 rounded-lg"
            >
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
