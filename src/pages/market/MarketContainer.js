import { Icon } from "@iconify/react";
import React from "react";
import { useContractsContext } from "../../context/ContractProvider";
import Filters from "./components/Filters";
import MarketBodyOptions from "./components/MarketBodyOptions";
import MarketItem from "./components/MarketItem";

export default function MarketContainer() {
  const [{ marketItems }] = useContractsContext();
  return (
    <div className="flex flex-row">
      <Filters />
      <div className="flex flex-col w-full mt-4">
        <div
          className="overflow-x-auto flex-1 px-8 py-4 md:px-32 md:py-0"
          style={{ maxHeight: "100vh" }}
        >
          <div className="w-full h-full relative">
            <div className="w-full h-full relative">
              <MarketBodyOptions />

              <div className="flex mt-8 flex-wrap justify-center w-full">
                {marketItems?.map((item) => {
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
