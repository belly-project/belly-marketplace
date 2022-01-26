import axios from "axios";
import { formatEther } from "ethers/lib/utils";
import React, { useCallback, useEffect } from "react";
import { useContractsContext } from "../../context/ContractProvider";
import { actionTypes } from "../../context/reducer";
import MarketItem from "../market/components/MarketItem";
import InventoryFilters from "./components/InventoryFilters";
import ProfileSidebar from "./components/ProfileSidebar";
import InventoryItem from "./components/InventoryItem";

const fetchURI = async (item) => {
  const tokenURI = item[2];
  let result = [];
  await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, image } = res.data;
      let _item = {
        tokenId: parseInt(item[0], 18),
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

export default function ProfileContainer() {
  const [{ wallet, myItems, bellyERC721Contract }, dispatch] =
    useContractsContext();
  const fetchMyTokens = useCallback(async () => {
    const _response = await bellyERC721Contract.getMyTokens({});
    let formattedItems = [];
    formattedItems = await Promise.all(
      _response.map(async (item) => {
        return await fetchURI(item);
      })
    );
    return formattedItems;
  }, [bellyERC721Contract]);

  useEffect(() => {
    if (wallet !== "") {
      fetchMyTokens().then((res) => {
        dispatch({
          type: actionTypes.SET_MY_ITEMS,
          myItems: res,
        });
      });
    }

    return () => {};
  }, [bellyERC721Contract.getItemsForSale, dispatch, fetchMyTokens, wallet]);

  return (
    <div className="flex flex-row">
      <ProfileSidebar wallet={wallet} />
      <div className="flex flex-col w-full mt-10">
        <div
          className="overflow-x-auto flex-1 px-8 py-4 md:px-32 md:py-0"
          style={{ maxHeight: "100vh" }}
        >
          <div className="w-full h-full relative">
            <div className="w-full h-full relative">
              <InventoryFilters />

              <div className="flex mt-8 flex-wrap justify-center w-full">
                {myItems?.map((item) => {
                  return (
                    <InventoryItem
                      key={item.tokenId}
                      tokenId={item.tokenId}
                      name={item.name}
                      price={item.price}
                      img={item.image}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
