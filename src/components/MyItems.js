import React from "react";
import { useContractsContext } from "../context/ContractProvider.js";

export default function MyItems() {
  const [{ myItems, bellyERC721Contract, bellyErc20Contract }, dispatch] =
    useContractsContext();

  const toggleForSale = async (item) => {
    const transcation = await bellyERC721Contract.toggleForSale(item.tokenId);

    const tx = await transcation.wait();

    console.log("tx");
  };
  return (
    <div className="border border-gray bg-gray rounded transition hover:shadow hover:border-gray">
      <div className="px-4 py-3">
        <div className="flex flex-col leading-16 items-center justify-between">
          <div className="mt-2 mb-1 flex flex-col">
            <small className=" flex-col truncate ml-2">BLY #000001</small>
            <div className="flex  flex-col justify-center items-center AxieCard_ImagePlaceholder__3rTDX">
              <img
                src="https://assets.axieinfinity.com/axies/6483566/axie/axie-full-transparent.png"
                alt="6483566"
                style={{ width: "222px", objectFit: "contain" }}
              />
            </div>
            <div className="h-0 pb-12 flex flex-row flex-wrap justify-center overflow-hidden items-baseline">
              <h5 className="truncate font-medium md:text-20 md:leading-24">
                Ξ 0.013
              </h5>
              <h6 className="truncate ml-4 text-[#a1a6b6] font-medium">$31</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
