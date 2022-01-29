import axios from "axios";
import { formatEther, parseEther } from "ethers/lib/utils";
import React, { useCallback, useEffect } from "react";
import { useContractsContext } from "../../context/ContractProvider";
import { actionTypes } from "../../context/reducer";
import CratesSidebar from "./components/CratesSidebar";

const fetchURI = async (item) => {
  const tokenURI = item[2];
  let result = [];
  await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, image } = res.data;
      let _item = {
        tokenId: parseInt(item[0].toHexString().toString(16)),
        itemURI: tokenURI,
        image: image.split("?")[0],
        name: name,
        price: formatEther(item[6]),
        owner: item[4],
      };
      result = _item;
    } else {
      console.log("EII");
    }
  });
  return result;
};

export default function CratesContainer() {
  const [
    { wallet, myItems, bellyERC721Contract, bellyERC20Contract },
    dispatch,
  ] = useContractsContext();
  const fetchMyTokens = useCallback(async () => {
    const _response = await bellyERC721Contract.getMyTokens({});
    let formattedItems = [];
    formattedItems = await Promise.all(
      _response.map(async (item) => {
        return await fetchURI(item);
      })
    );

    const _balance = await bellyERC20Contract.balanceOf(wallet);
    return {
      myItems: formattedItems,
      balance: formatEther(_balance),
    };
  }, [bellyERC20Contract, bellyERC721Contract, wallet]);

  useEffect(() => {
    if (wallet !== "") {
      fetchMyTokens().then((res) => {
        dispatch({
          type: actionTypes.SET_MY_ITEMS,
          myItems: res.myItems,
          balance: res.balance,
        });
      });
    }

    return () => {};
  }, [bellyERC721Contract.getItemsForSale, dispatch, fetchMyTokens, wallet]);

  return (
    <div className="flex flex-row">
      <CratesSidebar />
      <div className="flex flex-col w-full mt-10">
        <div
          className="overflow-x-auto flex-1 px-8 py-4 md:px-32 md:py-0"
          style={{ maxHeight: "100vh" }}
        >
          <div className="w-full h-full relative">
            <div className="w-full h-full relative">
              <div className="flex mt-8 flex-wrap justify-center w-full">

                <div className="flex flex-col justidy-center  p-2 m-2 bg-[#282b39]">
                  <img src="https://i.redd.it/udq9asephmpy.png"></img>
  
                  <div>
                    <h4 className="uppercase text-[#a1a6b6]">Simple Crate</h4>
                    <div className="flex justify-between align-center mt-2">
                      <div className="">10 BLY</div>
                      <button className="bg-[#6b7185] p-2 rounded-lg">Open</button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justidy-center  p-2 m-2 bg-[#282b39]">
                  <img src="https://i.redd.it/udq9asephmpy.png"></img>
  
                  <div>
                    <h4 className="uppercase text-[#a1a6b6]">Simple Crate</h4>
                    <div className="flex justify-between align-center mt-2">
                      <div className="">10 BLY</div>
                      <button className="bg-[#6b7185] p-2 rounded-lg">Open</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
