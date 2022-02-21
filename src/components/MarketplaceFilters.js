import React from "react";
import { useContractsContext } from "../context/ContractProvider.js";
import { actionTypes } from "../context/reducer.js";
import { filterByStats, orderItems } from "../context/utils.js";

export default function MarketplaceFilters({
  classSelected,
  setClassSelected,
  orderSelected,
  statsFiltersState,
  children,
}) {
  const { health, speed, strength, magic } = statsFiltersState;

  const [{ marketItems }, dispatch] = useContractsContext();

  const resetStatsFilter = () => {
    health.setState({
      min: 10,
      max: 300,
    });
    speed.setState({
      min: 10,
      max: 200,
    });
    strength.setState({
      min: 10,
      max: 300,
    });
    magic.setState({
      min: 0,
      max: 200,
    });

    let filteredItems = marketItems;

    if (classSelected !== "") {
      filteredItems = marketItems.filter(
        (item) => item._class === classSelected.toUpperCase()
      );
    }

    if (orderSelected) {
      filteredItems = orderItems(orderSelected, filteredItems);
    }

    dispatch({
      type: actionTypes.SET_MARKET_ITEMS_FILTERED,
      marketItems: filteredItems,
    });
  };

  const applyStatsFilter = () => {
    let filteredItems = marketItems;
    if (classSelected !== "") {
      filteredItems = marketItems.filter(
        (item) => item._class === classSelected.toUpperCase()
      );
    }
    filteredItems = orderItems(orderSelected, filteredItems);
    filteredItems = filterByStats(statsFiltersState, filteredItems);
    dispatch({
      type: actionTypes.SET_MARKET_ITEMS_FILTERED,
      marketItems: filteredItems,
    });
  };

  return (
    <div
      className="hidden md:flex fixed left-0 border-[#3a3f50] border-r "
      style={{ height: "94vh", width: "280px" }}
    >
      <div className="pb-32 w-full">
        <div className="w-full ">
          <div className="flex flex-row pr-2 pl-4 py-4  items-center">
            <h2 className="text-2xl bold">Filters</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

{
  /* 
<div className="" style={{ boxSizing: "border-box" }}>
<div className="py-4 pr-2 pl-4 border-t border-[#3a3f50]">
  <div className="flex items-center justify-between">
    <div className="flex items-center cursor-pointer w-full">
      <div onClick={() => setCollapseStats(!collapsedStats)}>
        <Icon
          icon={`ant-design:caret-${
            collapsedStats ? "down" : "right"
          }-filled`}
          color="gray"
        />
      </div>
      <div className="flex w-full justify-between">
        <div
          onClick={() => setCollapseStats(!collapsedStats)}
          className="ml-3 font-la text-28"
        >
          Stats
        </div>
        {collapsedStats && (
          <>
            <button
              onClick={(e) => applyStatsFilter()}
              className="mr-3 font-la text-[#046cfc] text-28"
            >
              Apply
            </button>
            <button
              onClick={(e) => resetStatsFilter()}
              className="mr-3 font-la text-[#046cfc] text-28"
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  </div>
  <div
    className="CollapseContent_container__2FLT6 CollapseContent_isOpen__3LOKg"
    style={{}}
  >
    <Collapse isOpened={collapsedStats}>
      <div className="px-2 mt-2 sm:px-0">

      </div>
    </Collapse>
  </div>
</div>
</div> */
}
