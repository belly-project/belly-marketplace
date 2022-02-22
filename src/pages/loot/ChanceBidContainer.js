import React, { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "../../context/ContractProvider";
import { chanceBidFetchURI } from "../../context/utils";

export default function ChanceBidContainer({ setSection, setDetailItem }) {
  const [latest, setLatest] = useState([]);
  const [chanceBidItems, setChanceBiItems] = useState([]);
  const [{ wallet, bellyERC20Contract, bellyChanceBidContract }, dispatch] =
    useContractsContext();

  const goToOpenCrate = (item) => {
    setSection("chanceBidItem");
    setDetailItem(item);
  };

  const fetchLatestChanceBids = useCallback(async () => {
    const bids = await bellyChanceBidContract.getCompletedChanceBids();
    let formattedItems = [];

    formattedItems = await Promise.all(
      bids.map(async (item) => {
        return await chanceBidFetchURI(item, 2);
      })
    );
    return formattedItems;
  }, [bellyChanceBidContract]);

  const fetchChanceBidsItems = useCallback(async () => {
    const bids = await bellyChanceBidContract.getChanceBidsItems();
    let formattedItems = [];

    formattedItems = await Promise.all(
      bids.map(async (item) => {
        return await chanceBidFetchURI(item, 2);
      })
    );
    return formattedItems;
  }, [bellyChanceBidContract]);

  useEffect(() => {
    if (wallet !== "") {
      fetchLatestChanceBids().then((res) => {
        setLatest(res);
      });

      fetchChanceBidsItems().then((res) => {
        setChanceBiItems(res);
      });
    }

    return () => {};
  }, [
    bellyERC20Contract,
    dispatch,
    fetchChanceBidsItems,
    fetchLatestChanceBids,
    wallet,
  ]);

  return (
    <div className="flex flex-row justify-between w-full">
      <div className="flex mt-8 flex-wrap justify-between w-full">
        {chanceBidItems?.map((item) => {
          return (
            <div
              key={Math.random(1, 999)}
              className="flex flex-col justify-center h-fit  p-2 m-2 bg-[#282b39]"
            >
              <img src={"https://i.redd.it/udq9asephmpy.png"} alt="dfaf"></img>

              <div>
                <h4 className="uppercase text-[#a1a6b6]">#{item.itemId}</h4>
                <div className="flex justify-between align-center mt-2">
                  <div className="">
                    {item.paidFor} / {item.total} BLY{" "}
                  </div>
                  <button
                    onClick={() => goToOpenCrate(item)}
                    className="bg-[#6b7185] p-2 rounded-lg"
                  >
                    BID
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex mt-8 flex-col justify-center items-end w-full">
        <div className="font-bold text-xl leading-24 text-white mb-4">
          Latest Chance Bids Completed
        </div>
        {latest?.map((item) => {
          return (
            <div
              key={Math.random(1, 999)}
              className="flex jusify-evenly w-fit mt-2 my-4 py-4 px-4 sm:px-4 sm:py-4 bg-color-[#282b39] border border-[#3a3f50] bg-[#282b39] rounded-lg"
            >
              <div>
                <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
                  Winner
                </div>
                <div className="mt-4 text-white font-bold leading-14 text-xs tracking-1 uppercase">
                  {item.owner.substring(0, 4)}...
                  {item.owner.substring(wallet.length - 4)}
                </div>
              </div>
              <div className="ml-8">
                <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
                  BLY Paid
                </div>
                <div className="mt-4 text-white font-bold leading-14 text-xs tracking-1 uppercase">
                  {item?.paidFor} BLY
                </div>
              </div>
              <div className="ml-8">
                <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
                  End price
                </div>
                <div className="mt-4 text-white font-bold leading-14 text-xs tracking-1 uppercase">
                  {item?.total} BLY
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
