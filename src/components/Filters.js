import React from "react";

export default function Filters() {
  return (
    <div
      className="hidden md:flex border-r overflow-y-auto"
      style={{ height: "94vh", width: "280px" }}
    >
      <div className="pb-32 w-full">
        <div className="pb-10 w-full">
          <div className="flex flex-row items-center">
            <h2 className="text-2xl bold">Filters</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
