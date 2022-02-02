import axios from "axios";
import { formatEther } from "ethers/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "../../context/ContractProvider.js";
import { actionTypes } from "../../context/reducer.js";
import ChanceBidContainer from "./components/ChanceBidContainer.js";
import ChanceBidItem from "./components/ChanceBidItem.js";
import CrateItem from "./components/CrateItem.js";
import CratesContainer from "./components/CratesContainer.js";
import LootSidebar from "./components/LootSidebar.js";

export default function LootContainer() {
  const [section, setSection] = useState("crates");

  const [detailItem, setDetailItem] = useState({});

  useEffect(() => {
    console.log(section);
  }, [section]);

  return (
    <div className="flex flex-row">
      <LootSidebar setSection={setSection} />
      <div className="flex flex-col w-full mt-10">
        <div
          className="overflow-x-auto flex-1 px-24 py-4  md:py-0"
          style={{ maxHeight: "100vh" }}
        >
          <div className="w-full h-full relative">
            <div className="w-full h-full relative">
              {section === "crates" && (
                <CratesContainer
                  setSection={setSection}
                  setDetailItem={setDetailItem}
                />
              )}
              {section === "chanceBid" && (
                <ChanceBidContainer
                  setSection={setSection}
                  setDetailItem={setDetailItem}
                />
              )}
              {section === "crateItem" && <CrateItem detailItem={detailItem} />}
              {section === "chanceBidItem" && (
                <ChanceBidItem detailItem={detailItem} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
