import { parseEther } from "ethers/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import { marketplaceApi } from "../../../context/axios";
import { useContractsContext } from "../../../context/ContractProvider";

export default function CratesContainer() {
  const [openCrate, setOpenCrate] = useState(false);
  const [
    { bellyDropsContract, bellyERC20Contract, bellyERC721Contract, wallet },
  ] = useContractsContext();

  const mintCrateToken = useCallback(
    async (randomResult) => {
      const resultCrate = await marketplaceApi.get(
        `getResultFromCase?random=${randomResult}`
      );

      const resultData = resultCrate.data;
      const tokenUri = resultData.tokenURI;
      if (tokenUri) {
        console.log(resultData);
        console.log("MINT CHARACTER");

        const mintTx = await bellyERC721Contract.mintBellyCharacter(
          0,
          bellyERC20Contract.address,
          tokenUri
        );
        let tx = await mintTx.wait();
        console.log(tx);
      }

      return "OKEY";
    },
    [bellyERC20Contract.address, bellyERC721Contract]
  );

  const requestOpenCrate = async () => {
    const _approveTransaction = await bellyERC20Contract.approve(
      bellyDropsContract.address,
      parseEther("10")
    );

    let tx = await _approveTransaction.wait();

    const _buyCrateTransaction = await bellyDropsContract.openCrate(
      bellyERC20Contract.address,
      parseEther("10")
    );

    tx = await _buyCrateTransaction.wait();

    console.log(tx);
    setOpenCrate(true);
  };

  useEffect(() => {
    if (wallet !== "") {
      bellyDropsContract
        .once("CrateOpened", (random, event) => {
          if (openCrate) {
            setOpenCrate(false);
            mintCrateToken(random).then((res) => {
              console.log(res);
            });
          }
        })
        .on("error", console.error);
    }
  }, [bellyDropsContract, mintCrateToken, openCrate, wallet]);

  return (
    <div className="flex mt-8 flex-wrap justify-center w-full">
      <div className="flex flex-col justidy-center  p-2 m-2 bg-[#282b39]">
        <img src="https://i.redd.it/udq9asephmpy.png" alt="dfaf"></img>

        <div>
          <h4 className="uppercase text-[#a1a6b6]">Simple Crate</h4>
          <div className="flex justify-between align-center mt-2">
            <div className="">10 BLY </div>
            <button
              onClick={() => requestOpenCrate()}
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
