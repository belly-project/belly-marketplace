import React, { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "../../context/ContractProvider.js";
import { actionTypes } from "../../context/reducer.js";
import { basicFetchURI } from "../../context/utils.js";
import Filters from "./components/Filters.js";
import MarketBodyOptions from "./components/MarketBodyOptions.js";
import MarketItem from "./components/MarketItem.js";

export default function MarketContainer() {
  const [classSelected, setClassSelected] = useState("");
  const [orderSelected, setOrderSelected] = useState(1);
  const [
    { marketItems, marketItemsFiltered, bellyERC721Contract, wallet },
    dispatch,
  ] = useContractsContext();
  const [filters, setFilters] = useState({});
  const [ordered, setOrdered] = useState({});
  const fetchMarketItemsData = useCallback(async () => {
    let _response = await bellyERC721Contract.getItemsForSale({});

    _response = _response.filter((item) => item[4] !== wallet);

    let formattedItems = [];
    formattedItems = await Promise.all(
      _response.map(async (item) => {
        return await basicFetchURI(item);
      })
    );
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

  return (
    <div className="flex flex-row">
      <Filters
        setFilterItem={setFilters}
        orderSelected={orderSelected}
        classSelected={classSelected}
        setClassSelected={setClassSelected}
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
              />

              <div className="flex mt-8 flex-wrap justify-center w-full">
                {marketItemsFiltered?.map((item) => {
                  return (
                    <MarketItem
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
