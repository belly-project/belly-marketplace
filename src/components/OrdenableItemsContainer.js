import { Icon } from "@iconify/react";
import React, { useCallback, useRef, useState } from "react";
import { configData } from "../configData";
import SortItemsFilters from "./SortItemsFilters";

export default function OrdenableItemsContainer({
  itemList,
  ItemComponentGrid,
  ItemComponentList,
  classSelected,
  statsFiltersState,
}) {
  const [orderSelected, setOrderSelected] = useState("1");
  const [viewSelected, setViewSelected] = useState("GRID");
  const [scrolled, setScrolled] = useState(false);
  const topRef = useRef();

  const onScroll = useCallback(() => {
    if (topRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = topRef.current;
      setScrolled(scrollTop + clientHeight - 200 > scrollHeight - 300);
    }
  }, []);
  const goToTop = () => {
    topRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="flex-1 px-8 py-4 md:px-4 md:py-0 overflow-auto h-full"
      ref={topRef}
      onScroll={onScroll}
      style={{ maxHeight: "100vh" }}
    >
      <div className="w-full  relative ">
        <div className="w-full h-full relative flex flex-col items-center justify-center ">
          {configData.orderType !== undefined && (
            <SortItemsFilters
              classSelected={classSelected}
              orderSelected={orderSelected}
              setOrderSelected={setOrderSelected}
              statsFiltersState={statsFiltersState}
              viewSelected={viewSelected}
              setViewSelected={setViewSelected}
              sortOptions={configData.orderType?.sort}
              viewOptions={configData.orderType?.view}
            />
          )}

          {viewSelected === "GRID" ? (
            <div className="flex  mt-2 flex-wrap justify-center w-full h-full">
              {itemList?.map((item) => {
                return (
                  <ItemComponentGrid
                    type="GRID"
                    key={Math.random(1, 99999)}
                    item={item}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex mt-2 flex-col justify-center w-full">
              {itemList?.map((item) => {
                return (
                  <ItemComponentList
                    type="LIST"
                    key={Math.random(1, 99999)}
                    item={item}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="w-100 mt-10">
        {scrolled && (
          <button
            onClick={() => goToTop()}
            className="absolute bottom-5 right-10 border vborder-white p-2 rounded-full bg-primary-3 cursor-pointer hover:animate-bounce"
          >
            <Icon icon="ant-design:up-outlined" width={32} color="white" />
          </button>
        )}
      </div>
    </div>
  );
}
