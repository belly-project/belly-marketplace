import React from "react";
import MarketItems from "./MarketItems";

export default function MarketContainer() {
  return (
    <div
      className="flex-1 overflow-y-auto px-8 py-12 md:px-32 md:py-2"
      style={{ height: "calc(100vh - 110px)" }}
    >
      <div className="w-full h-full relative">
        <div className="relative min-h-full w-full">
          <div className="relative flex flex-wrap justify-between flex-col-reverse xl:flex-row">
            <div className="flex items-center mt-12 xl:mt-0 w-full xl:w-auto justify-between xl:justify-end">
              <h2
                className="text-2xl md:text-28 md:leading-32 mt-12 md:mt-0"
                style={{ minWidth: "80px" }}
              >
                <span>7 tokens</span>
              </h2>
            </div>
            <div className="flex mt-2 flex-wrap justify-center">
              <div className="m-8 cursor-pointer" />
              <a href="/">
                <MarketItems />
                <MarketItems />
                <MarketItems />
                <MarketItems />
                <MarketItems />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
