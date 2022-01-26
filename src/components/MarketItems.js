import { Button } from "@mui/material";
import { formatEther, parseEther } from "ethers/lib/utils";
import React, { useEffect } from "react";
import { useContractsContext } from "../context/ContractProvider";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default function MarketItems() {
  const [
    { marketItems, wallet, bellyERC721Contract, bellyERC20Contract },
    dispatch,
  ] = useContractsContext();

  const buyToken = async (item) => {
    console.log(item);

    const _approveTransaction = await bellyERC20Contract.approve(
      bellyERC721Contract.address,
      parseEther("20")
    );

    let tx = await _approveTransaction.wait();

    console.log(tx);

    const _buyTokenTransaction = await bellyERC721Contract.buyToken(
      wallet,
      bellyERC20Contract.address,
      item.tokenId,
      parseEther("20")
    );

    tx = await _buyTokenTransaction.wait();

    console.log(tx);
    window.location.reload(false);
  };
  return (
    <div className="border border-gray bg-gray rounded transition hover:shadow hover:border-gray">
      <div class="px-4 py-3">
        <div class="flex flex-col leading-16 items-center justify-between">
          <div className="mt-2 mb-1 flex flex-col">
            <small class=" flex-col truncate ml-2">BLY #000001</small>
            <div class="flex  flex-col justify-center items-center AxieCard_ImagePlaceholder__3rTDX">
              <img
                src="https://assets.axieinfinity.com/axies/6483566/axie/axie-full-transparent.png"
                alt="6483566"
                style={{ width: "222px", objectFit: "contain" }}
              />
            </div>
            <div class="h-0 pb-12 flex flex-row flex-wrap justify-center overflow-hidden items-baseline">
              <h5 class="truncate font-medium md:text-20 md:leading-24">
                Ξ 0.013
              </h5>
              <h6 class="truncate ml-4 text-gray-1 font-medium">$31</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
<div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {marketItems.map((item) => {
        return (
          <div key={Math.random(1, 99999999)} style={{ padding: "5px" }}>
            <img
              loading="lazy"
              src={
                item.image !== "" ? item.image : "https://i.gifer.com/V4Jv.gif"
              }
              alt={item.name === "" ? item.name : "NEEN"}
              style={{ width: "128px", height: "128px", objectFit: "contain" }}
            />
            <h1>{item?.name}</h1>
            <h3>{item?.price} BLY</h3>
            <p>TokenID ={item.tokenId}</p>
            <button onClick={() => buyToken(item)}>BUY</button>
          </div>
        );
      })}
    </div>
    */
