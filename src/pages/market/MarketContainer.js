/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "../../context/ContractProvider.js";
import { actionTypes } from "../../context/reducer.js";
import { basicFetchURI, orderItems } from "../../context/utils.js";
import Filters from "./components/Filters.js";
import MarketBodyOptions from "./components/MarketBodyOptions.js";
import MarketItem from "./components/MarketItem.js";

export default function MarketContainer() {
  const [classSelected, setClassSelected] = useState("");
  const [orderSelected, setOrderSelected] = useState("1");
  const [viewSelected, setViewSelected] = useState("GRID");
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
    <div className="flex flex-row">
      <Filters
        orderSelected={orderSelected}
        classSelected={classSelected}
        setClassSelected={setClassSelected}
        statsFiltersState={statsFiltersState}
      />
      <div className="flex flex-col w-full mt-4">
        <div
          className="overflow-x-auto flex-1 px-8 py-4 md:px-32 md:py-0"
          style={{ maxHeight: "100vh" }}
        >
          <div className="w-full h-full relative">
            <div className="w-full h-full relative">
              <MarketBodyOptions
                classSelected={classSelected}
                orderSelected={orderSelected}
                setOrderSelected={setOrderSelected}
                statsFiltersState={statsFiltersState}
                viewSelected={viewSelected}
                setViewSelected={setViewSelected}
              />

              {viewSelected === "GRID" ? (
                <div className="flex mt-8 flex-wrap justify-center w-full">
                  {marketItemsFiltered?.map((item) => {
                    return (
                      <MarketItem
                        type={"GRID"}
                        key={item.tokenId}
                        tokenId={item.tokenId}
                        name={item.name}
                        price={item.price}
                        img={item.image}
                        weaponsArray={item.weapons}
                        statsDict={item.stats}
                        _class={item.class}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="flex mt-8 flex-col justify-center w-full">
                  {marketItemsFiltered?.map((item) => {
                    return (
                      <MarketItem
                        type={"LIST"}
                        key={item.tokenId}
                        tokenId={item.tokenId}
                        name={item.name}
                        price={item.price}
                        img={item.image}
                        weaponsArray={item.weapons}
                        statsDict={item.stats}
                        _class={item.class}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
