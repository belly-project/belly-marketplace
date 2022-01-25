import { Button } from "@mui/material";
import { formatEther, parseEther } from "ethers/lib/utils";
import React, { useEffect } from "react";
import { useContractsContext } from "../context/ContractProvider";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default function MyItems() {
  const [{ myItems, bellyERC721Contract, bellyErc20Contract }, dispatch] =
    useContractsContext();

  const toggleForSale = async (item) => {
    const transcation = await bellyERC721Contract.toggleForSale(item.tokenId);

    const tx = await transcation.wait();

    console.log("tx");
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {myItems.map((item) => {
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
            <Button onClick={() => toggleForSale(item)} variant="contained">
              Add for Sale
            </Button>
          </div>
        );
      })}
    </div>
  );
}
