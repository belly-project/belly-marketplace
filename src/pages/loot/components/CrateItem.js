import React from "react";
import BuyableItemWrapper from "../../../components/BuyableItemWrapper.js";
import CrateActionContainer from "./CrateActionContainer.js";
import CrateItemPresentation from "./CrateItemPresentation.js";

export default function CrateItem({ detailItem }) {
  return (
    <BuyableItemWrapper
      ItemPresentation={CrateItemPresentation}
      ItemAction={CrateActionContainer}
      detailItem={detailItem}
    />
  );
}
