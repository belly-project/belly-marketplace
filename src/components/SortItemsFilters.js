import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { configData } from "../configData";
import { useContractsContext } from "../context/ContractProvider";
import { actionTypes } from "../context/reducer";
import { filterByStats, orderItems } from "../context/utils";

export default function SortItemsFilters({
  classSelected,
  orderSelected,
  setOrderSelected,
  statsFiltersState,
  viewSelected,
  setViewSelected,
  sortOptions,
  viewOptions,
}) {
  const [{ marketItems, marketItemsFiltered }, dispatch] =
    useContractsContext();
  const orderMarketItems = (value) => {
    console.log("KE");
    let orderedItems = orderItems(
      value,
      classSelected !== "" ? marketItemsFiltered : marketItems,
      setOrderSelected
    );
    console.log(orderSelected);

    setOrderSelected(value);

    if (configData.nftStatsFilters) {
      orderedItems = filterByStats(statsFiltersState, orderedItems);
    }

    dispatch({
      type: actionTypes.SET_MARKET_ITEMS_FILTERED,
      marketItems: orderedItems,
    });
  };

  return (
    <div className="relative flex flex-wrap justify-between flex-col-reverse xl:flex-row">
      <div className="flex justify- items-center xl:justify-center">
        <div className="flex items-center w-full justify-between xl:w-auto">
          {sortOptions !== undefined && (
            <div>
              <div className="text-left" style={{ width: "158px" }}>
                <select
                  onChange={(e) => orderMarketItems(e.target.value)}
                  className="text-white bg-gray-5 px-2 py-2 relative rounded transition focus:outline-none border w-full text-white border-gray-2 hover:border-gray-1 active:border-primary-3 bg-gray-5 hover:bg-gray-4 active:bg-gray-6"
                  value={orderSelected}
                >
                  {sortOptions?.map((opt) => {
                    return (
                      <option key={Math.random(1, 99999)} value={opt.id}>
                        {opt.text}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}
          {viewOptions !== undefined && (
            <div className="flex items-centerbtn-groups">
              <div className="flex cursor-pointer ml-8">
                <div className="control-group inline-flex flex-row horizontal">
                  {viewOptions.map((opt) => {
                    return (
                      <div
                        key={Math.random(1, 99999)}
                        onClick={() => setViewSelected(opt.text)}
                        className="border hover:border-gray-1 active:border-primary-3 hover:bg-gray-4 active:bg-gray-6 border-gray-2 rounded-l p-3 flex items-center justify-center border border-primary-4"
                        style={{
                          background: viewSelected === opt.text ? "blue" : "",
                        }}
                      >
                        <Icon icon={opt.icon} color="white" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
