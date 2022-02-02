import axios from "axios";
import { formatEther } from "ethers/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "../../../context/ContractProvider";

const fetchURI = async (item, index = 2) => {
  const tokenURI = item[index];
  let result = [];
  await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, description, weapons, image } = res.data;

      let _item = {
        itemURI: tokenURI,
        image: image,
        name: name,
        owner: item[1],
        total: item[3].toString(),
        paidFor: item[4].toString(),
      };
      result = _item;
    } else {
      console.log("EII");
    }
  });
  return result;
};

export default function ChanceBidContainer({ setSection, setDetailItem }) {
  const [latest, setLatest] = useState([]);
  const [
    { wallet, bellyDropsContract, bellyERC20Contract, bellyChanceBidContract },
    dispatch,
  ] = useContractsContext();

  const goToOpenCrate = () => {
    setSection("chanceBidItem");
    setDetailItem({
      crateId: 1,
      img: "https://i.redd.it/udq9asephmpy.png",
      price: 10,
    });
  };

  const fetchLatestChanceBids = useCallback(async () => {
    const bids = await bellyChanceBidContract.getCompletedChanceBids();
    console.log(bids);
    let formattedItems = [];
    formattedItems = await Promise.all(
      bids.map(async (item) => {
        return await fetchURI(item, 2);
      })
    );
    return formattedItems;
  }, [bellyChanceBidContract]);

  useEffect(() => {
    if (wallet !== "") {
      fetchLatestChanceBids().then((res) => {
        console.log(res);
        setLatest(res);
      });
    }

    return () => {};
  }, [bellyERC20Contract, dispatch, fetchLatestChanceBids, wallet]);

  return (
    <div className="flex flex-row justify-between w-full">
      <div className="flex mt-8 flex-wrap justify-between w-full">
        <div className="flex flex-col justify-center h-fit  p-2 m-2 bg-[#282b39]">
          <img src="https://i.redd.it/udq9asephmpy.png" alt="dfaf"></img>

          <div>
            <h4 className="uppercase text-[#a1a6b6]">Random Bid</h4>
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
        <div className="flex flex-col justify-center h-fit  p-2 m-2 bg-[#282b39]">
          <img src="https://i.redd.it/udq9asephmpy.png" alt="dfaf"></img>

          <div>
            <h4 className="uppercase text-[#a1a6b6]">Random Bid</h4>
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
        <div className="flex flex-col justify-center h-fit  p-2 m-2 bg-[#282b39]">
          <img src="https://i.redd.it/udq9asephmpy.png" alt="dfaf"></img>

          <div>
            <h4 className="uppercase text-[#a1a6b6]">Random Bid</h4>
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
      <div className="flex mt-8 flex-col justify-center items-end w-full">
        <div className="font-bold text-xl leading-24 text-white mb-4">
          Latest Chance Bids Completed
        </div>
        {latest?.map((item) => {
          return (
            <div
              key={item.name}
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
