import React from "react";

export default function BattlegroundContainer() {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-full mt-10">
        <div
          className="overflow-x-auto flex-1 px-8 py-4 md:px-32 md:py-0"
          style={{ maxHeight: "100vh" }}
        >
          <div className="w-full h-full relative">
            <div className="w-full h-full relative">
              <div className="flex mt-8 flex-wrap justify-center w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
