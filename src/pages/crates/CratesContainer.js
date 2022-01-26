import React from "react";
import CratesSidebar from "./components/CratesSidebar";

export default function CratesContainer() {
  return (
    <div className="flex flex-row">
      <CratesSidebar />
      <div className="flex flex-col w-full mt-10">
        <div
          className="overflow-x-auto flex-1 px-8 py-4 md:px-32 md:py-0"
          style={{ maxHeight: "100vh" }}
        >
          <div className="w-full h-full relative">
            <div className="w-full h-full relative"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
