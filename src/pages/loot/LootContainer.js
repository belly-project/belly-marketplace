import React, { useState } from "react";
import ChanceBidContainer from "./ChanceBidContainer.js";
import ChanceBidItem from "./components/ChanceBidItem.js";
import CrateItem from "./components/CrateItem.js";
import CratesContainer from "./CratesContainer.js";
import LootSidebar from "./components/LootSidebar.js";

export default function LootContainer() {
  const [section, setSection] = useState("crates");

  const [detailItem, setDetailItem] = useState({});

  return (
    <div className="flex flex-row">
      <LootSidebar setSection={setSection} />
      <div className="flex flex-col w-full mt-10">
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
  );
}
