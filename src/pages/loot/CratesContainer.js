import React, { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "../../context/ContractProvider";
import { chanceBidFetchURI, crateFetchURI } from "../../context/utils";

export default function CratesContainer({ setSection, setDetailItem }) {
  const [latest, setLatest] = useState([]);
  const [{ wallet, bellyDropsContract, bellyERC20Contract }, dispatch] =
    useContractsContext();
  const goToOpenCrate = () => {
    setSection("crateItem");
    setDetailItem({
      crateId: 1,
      img: "https://i.redd.it/udq9asephmpy.png",
      price: 10,
    });
  };

  const fetchLatestChanceBids = useCallback(async () => {
    const bids = await bellyDropsContract.getCrateResults();
    let formattedItems = [];

    formattedItems = await Promise.all(
      bids.map(async (item) => {
        return await crateFetchURI(item, 4);
      })
    );
    formattedItems = formattedItems.reverse();
    return formattedItems.slice(0, 6);
  }, [bellyDropsContract]);

  useEffect(() => {
    if (wallet !== "") {
      fetchLatestChanceBids().then((res) => {
        setLatest(res);
      });
    }

    return () => {};
  }, [bellyERC20Contract, dispatch, fetchLatestChanceBids, wallet]);
  return (
    <div className="flex flex-row justify-between w-75">
      <div className="border rounded-lg m-3 h-full border-gray bg-gray rounded transition hover:shadow hover:border-[#046cfc] cursor-pointer">
        <div className="flex flex-col justify-center h-fit  p-2 m-2 bg-[#282b39]">
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
      <div className="h-full mt-8 w-25">
        <div className="font-bold text-xl leading-24 text-white mb-4 ">
          Latest Crates Drops
        </div>
        {latest?.map((item) => {
          return (
            <div
              key={Math.random(1, 999)}
              className="flex items-center justify-between w-full mt-2 my-4 py-4 px-4 bg-color-[#282b39] border border-[#3a3f50] bg-[#282b39] rounded-lg"
            >
              <div>
                <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
                  OPENED BY
                </div>
                <div className="mt-4 text-white font-bold leading-14 text-xs tracking-1 uppercase">
                  {item.mintedBy.substring(0, 4)}...
                  {item.mintedBy.substring(wallet.length - 4)}
                </div>
              </div>
              <div className="ml-8">
                <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
                  BLY Paid
                </div>
                <div className="mt-4 text-white font-bold leading-14 text-xs tracking-1 uppercase">
                  {item?.price} BLY
                </div>
              </div>
              <div className="ml-8">
                <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
                  Minted
                </div>
                <div className="mt-4 text-white font-bold leading-14 text-xs tracking-1 uppercase">
                  {item.name}
                </div>
              </div>
              <div className="ml-8">
                <img src={item.image} alt={item.name} width={64} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
