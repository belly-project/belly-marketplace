/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "../../context/ContractProvider.js";
import { actionTypes } from "../../context/reducer.js";
import {
  basicFetchURI,
  classFilters,
  filterByStats,
  orderItems,
  statsFilters,
} from "../../context/utils.js";
import MarketplaceFilters from "../../components/MarketplaceFilters.js";
import OrdenableItemsContainer from "../../components/OrdenableItemsContainer.js";
import MarketItem from "./components/MarketItem.js";
import ButtonSelectionFilter from "../../components/filters/ButtonSelectionFilter.js";
import FilterSection from "../../components/filters/FilterSection.js";
import RangeGroupFilter from "../../components/filters/RangeGroupFilter.js";
import ClassFilterItem from "../../components/filters/ClassFilterItem.js";

export default function MarketContainer() {
  const [filtersState, setFiltersState] = useState({
    classFilterState: {},
    statsFilterState: {},
  });
  const [collapsedClass, setCollapseClass] = useState(false);
  const [collapsedStats, setCollapseStats] = useState(false);

  const [classSelected, setClassSelected] = useState("");
  const [orderSelected, setOrderSelected] = useState("1");
  const [
    {
      marketData,
      marketItems,
      marketItemsFiltered,
      bellyERC721Contract,
      wallet,
    },
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

  const statsFiltersState = [
    {
      info: statsFilters.find((f) => f.name === "Health"),
      state: healthFilter,
      setState: setHealthFilter,
    },
    {
      info: statsFilters.find((f) => f.name === "Speed"),
      state: speedFilter,
      setState: setSpeedFilter,
    },
    {
      info: statsFilters.find((f) => f.name === "Strength"),
      state: strengthFilter,
      setState: setStrengthFilter,
    },
    {
      info: statsFilters.find((f) => f.name === "Magic"),
      state: magicFilter,
      setState: setMagicFilter,
    },
  ];

  const resetStatsFilter = () => {
    statsFiltersState[0].setState({
      min: 10,
      max: 300,
    });
    statsFiltersState[1].setState({
      min: 10,
      max: 200,
    });
    statsFiltersState[2].setState({
      min: 10,
      max: 300,
    });
    statsFiltersState[3].setState({
      min: 0,
      max: 200,
    });

    let filteredItems = marketItems;

    if (classSelected.text !== "") {
      filteredItems = marketItems.filter(
        (item) => item._class === classSelected.text.toUpperCase()
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
    console.log(classSelected);
    if (classSelected.text !== "") {
      filteredItems = marketItems.filter(
        (item) => item._class === classSelected.text.toUpperCase()
      );
    }

    filteredItems = orderItems(orderSelected, filteredItems);
    console.log(filteredItems);
    filteredItems = filterByStats(statsFiltersState, filteredItems);
    dispatch({
      type: actionTypes.SET_MARKET_ITEMS_FILTERED,
      marketItems: filteredItems,
    });
  };

  const fetchMarketItemsData = useCallback(async () => {
    let _response = await bellyERC721Contract.getItemsForSale();

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

  const filterByClass = (_class) => {
    let filteredItems = marketItems;
    //Filtrar por clase

    if (_class === classSelected) {
      setClassSelected("");
    } else {
      filteredItems = marketItems.filter(
        (item) => item._class === _class.text.toUpperCase()
      );

      setClassSelected(_class);
    }
    filteredItems = orderItems(orderSelected, filteredItems);
    filteredItems = filterByStats(statsFiltersState, filteredItems);
    dispatch({
      type: actionTypes.SET_MARKET_ITEMS_FILTERED,
      marketItems: filteredItems,
    });
  };

  useEffect(() => {
    if (wallet !== "") {
      console.log(wallet);
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
    <div className="flex flex-row " style={{ height: "94vh" }}>
      <MarketplaceFilters
        orderSelected={orderSelected}
        classSelected={classSelected}
        setClassSelected={setClassSelected}
        statsFiltersState={statsFiltersState}
      >
        <FilterSection
          title={"Class"}
          filterState={filtersState}
          sectionState={classSelected}
          setFiltersState={setFiltersState}
          isCollapse={true}
          collapseState={collapsedClass}
          setCollapseState={setCollapseClass}
        >
          <ButtonSelectionFilter
            onSelection={filterByClass}
            state={classSelected}
            setState={setClassSelected}
            filterList={marketData.nftTypes}
            FilterComponent={ClassFilterItem}
          />
        </FilterSection>
        <FilterSection
          filterState={filtersState}
          sectionState={statsFiltersState}
          setFiltersState={setFiltersState}
          title={"Stats"}
          isCollapse={true}
          collapseState={collapsedStats}
          setCollapseState={setCollapseStats}
          action={{
            text: "Apply",
            onClick: applyStatsFilter,
          }}
          resetSectionState={resetStatsFilter}
        >
          <RangeGroupFilter
            state={statsFiltersState}
            setState={setFiltersState}
            filterList={statsFiltersState}
          />
        </FilterSection>
      </MarketplaceFilters>
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
