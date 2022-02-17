import { formatEther } from "ethers/lib/utils";
import React, { useCallback, useEffect } from "react";
import { useContractsContext } from "../../context/ContractProvider.js";
import { actionTypes } from "../../context/reducer.js";
import ProfileSidebar from "./components/ProfileSidebar.js";
import MarketItem from "../market/components/MarketItem.js";
import { basicFetchURI } from "../../context/utils.js";
import OrdenableItemsContainer from "../../components/OrdenableItemsContainer.js";

export default function ProfileContainer() {
  const [
    { wallet, myItems, bellyERC721Contract, bellyERC20Contract },
    dispatch,
  ] = useContractsContext();
  const fetchMyTokens = useCallback(async () => {
    const _response = await bellyERC721Contract.getMyTokens({});
    let formattedItems = [];
    formattedItems = await Promise.all(
      _response.map(async (item) => {
        return await basicFetchURI(item);
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
  }, [
    bellyERC20Contract,
    bellyERC721Contract,
    dispatch,
    fetchMyTokens,
    wallet,
  ]);

  return (
    <div className="flex flex-row">
      <ProfileSidebar />
      <div className="w-full h-full mt-4  ">
        <OrdenableItemsContainer
          itemList={myItems}
          ItemComponentGrid={MarketItem}
          ItemComponentList={MarketItem}
        />
      </div>
    </div>
  );
}
