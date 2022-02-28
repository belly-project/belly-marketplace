import { Icon } from "@iconify/react";
import React, { useState } from "react";
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
}) {
  const [{ marketItems, marketItemsFiltered }, dispatch] =
    useContractsContext();
  const orderMarketItems = (value) => {
    let orderedItems = orderItems(
      value,
      classSelected !== "" ? marketItemsFiltered : marketItems,
      setOrderSelected
    );

    orderedItems = filterByStats(statsFiltersState, orderedItems);

    dispatch({
      type: actionTypes.SET_MARKET_ITEMS_FILTERED,
      marketItems: orderedItems,
    });
  };

  return (
    <div className="relative flex flex-wrap justify-between flex-col-reverse xl:flex-row">
      <div className="flex justify- items-center xl:justify-center">
        <div className="flex items-center w-full justify-between xl:w-auto">
          <div>
            <div className="text-left" style={{ width: "158px" }}>
              <select
                onChange={(e) => orderMarketItems(e.target.value)}
                className="text-white bg-gray-5 px-2 py-2 relative rounded transition focus:outline-none border w-full text-white border-gray-2 hover:border-gray-1 active:border-primary-3 bg-gray-5 hover:bg-gray-4 active:bg-gray-6"
              >
                <option value={1}>Lowest Price</option>
                <option value={2}>Highest Price</option>
                <option value={3}>More Recent</option>
                <option value={4}>Older</option>
              </select>
            </div>
          </div>

          <div className="flex items-centerbtn-groups">
            <div className="ml-8 relative hidden md:hidden">
              <div className="flex">
                <button className="px-20 py-8 relative rounded transition focus:outline-none border text-white border-gray-2 hover:border-gray-1 active:border-primary-3 bg-gray-5 hover:bg-gray-4 active:bg-gray-6">
                  <span className="visible">
                    <div className="flex items-center">
                      <div
                        className="ml-8 truncate"
                        style={{ maxWidth: "36px" }}
                      >
                        Filter{" "}
                      </div>
                    </div>
                  </span>
                </button>
              </div>
            </div>
            <div>
              <div className="flex cursor-pointer ml-8">
                <div className="control-group inline-flex flex-row horizontal">
                  <div
                    onClick={() => setViewSelected("GRID")}
                    className="border hover:border-gray-1 active:border-primary-3 hover:bg-gray-4 active:bg-gray-6 border-gray-2 rounded-l p-3 flex items-center justify-center border border-primary-4"
                    style={{
                      background: viewSelected === "GRID" ? "blue" : "",
                    }}
                  >
                    <Icon icon="dashicons:grid-view" color="white" />
                  </div>
                  <div
                    onClick={() => setViewSelected("LIST")}
                    className="border hover:border-gray-1 active:border-primary-3 hover:bg-gray-4 active:bg-gray-6 border-gray-2 rounded-r p-3 flex items-center justify-center"
                    style={{
                      background: viewSelected === "LIST" ? "blue" : "",
                    }}
                  >
                    <Icon icon="dashicons:excerpt-view" color="white" />
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
