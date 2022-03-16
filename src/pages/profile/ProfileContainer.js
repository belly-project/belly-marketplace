import { formatEther } from "ethers/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "../../context/ContractProvider.js";
import { actionTypes } from "../../context/reducer.js";
import ProfileSidebar from "./components/ProfileSidebar.js";
import MarketItem from "../market/components/MarketItem.js";
import { basicFetchURI } from "../../context/utils.js";
import OrdenableItemsContainer from "../../components/OrdenableItemsContainer.js";
import { getMyTokens } from "../../apollo/queries.js";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { configData } from "../../configData.js";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export default function ProfileContainer() {
  const { width } = useWindowDimensions();
  const [
    { wallet, myItems, bellyERC721Contract, bellyERC20Contract },
    dispatch,
  ] = useContractsContext();

  const navigate = useNavigate();
  const fetchMyTokens = useCallback(async () => {
    /*  const _response = await bellyERC721Contract.getMyTokens({}); */

    let res = await getMyTokens(wallet);
    let _response = res.holders[0]?.nftsOwned;
    let owner = res.holders[0]?.id;
    let formattedItems = [];
    if (_response) {
      formattedItems = await Promise.all(
        _response.map(async (item) => {
          return await basicFetchURI({ ...item, currentOwner: owner });
        })
      );
    }
    formattedItems = formattedItems.filter((item) => item !== 0);
    return {
      myItems: formattedItems,
    };
  }, [wallet]);

  useEffect(() => {
    if (wallet !== "") {
      fetchMyTokens().then((res) => {
        dispatch({
          type: actionTypes.SET_MY_ITEMS,
          myItems: res.myItems,
        });
      });
    } else {
      navigate("/");
    }

    return () => {};
  }, [
    bellyERC20Contract,
    bellyERC721Contract,
    dispatch,
    fetchMyTokens,
    navigate,
    wallet,
  ]);

  return (
    <div className="flex flex-col 2sm:flex-row h-full ">
      <ProfileSidebar responsive={width < 600} />
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
