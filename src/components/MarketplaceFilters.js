import React from "react";

export default function MarketplaceFilters({ children }) {
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
