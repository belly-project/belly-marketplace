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
  };
  return (
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
            <Button onClick={() => buyToken(item)} variant="contained">
              BUY
            </Button>
          </div>
        );
      })}
    </div>
  );
}
