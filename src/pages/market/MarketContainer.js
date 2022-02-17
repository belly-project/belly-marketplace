/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "../../context/ContractProvider.js";
import { actionTypes } from "../../context/reducer.js";
import { basicFetchURI, orderItems } from "../../context/utils.js";
import Filters from "./components/Filters.js";
import OrdenableItemsContainer from "../../components/OrdenableItemsContainer.js";
import MarketItem from "./components/MarketItem.js";

export default function MarketContainer() {
  const [classSelected, setClassSelected] = useState("");
  const [orderSelected, setOrderSelected] = useState("1");
  const [
    { marketItems, marketItemsFiltered, bellyERC721Contract, wallet },
    dispatch,
  ] = useContractsContext();
  const [healthFilter, setHealthFilter] = useState({
    min: 10,
    max: 300,
  });
  const [speedFilter, setSpeedFilter] = useState({
    min: 10,
    max: 200,
  });
  const [strengthFilter, setStrengthFilter] = useState({
    min: 10,
    max: 200,
  });
  const [magicFilter, setMagicFilter] = useState({
    min: 0,
    max: 200,
  });
  const fetchMarketItemsData = useCallback(async () => {
    let _response = await bellyERC721Contract.getItemsForSale({});

    _response = _response.filter((item) => item[4] !== wallet);

    let formattedItems = [];
    formattedItems = await Promise.all(
      _response.map(async (item) => {
        return await basicFetchURI(item);
      })
    );

    formattedItems = orderItems("1", formattedItems);
    return formattedItems;
  }, [bellyERC721Contract, wallet]);

  useEffect(() => {
    if (wallet !== "") {
      fetchMarketItemsData().then((res) => {
        dispatch({
          type: actionTypes.SET_MARKET_ITEMS,
          marketItems: res,
        });
      });
    }

    return () => {};
  }, [bellyERC721Contract, dispatch, fetchMarketItemsData, wallet]);

  const statsFiltersState = {
    health: {
      state: healthFilter,
      setState: setHealthFilter,
    },
    speed: {
      state: speedFilter,
      setState: setSpeedFilter,
    },
    strength: {
      state: strengthFilter,
      setState: setStrengthFilter,
    },
    magic: {
      state: magicFilter,
      setState: setMagicFilter,
    },
  };
  return (
    <div className="flex flex-row " style={{ height: "94vh" }}>
      <Filters
        orderSelected={orderSelected}
        classSelected={classSelected}
        setClassSelected={setClassSelected}
        statsFiltersState={statsFiltersState}
      />
      <div className="w-full h-full mt-4  ">
        <OrdenableItemsContainer
          itemList={marketItemsFiltered}
          ItemComponentGrid={MarketItem}
          ItemComponentList={MarketItem}
          classSelected={classSelected}
          statsFiltersState={statsFiltersState}
        />
      </div>
    </div>
  );
}
