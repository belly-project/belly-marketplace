import React from "react";
import BuyableItemWrapper from "../../../components/BuyableItemWrapper.js";
import CrateActionContainer from "./CrateActionContainer.js";
import CrateItemPresentation from "./CrateItemPresentation.js";

export default function CrateItem({ detailItem }) {
  return (
    <div className="mx-auto px-16 md:mt-10 flex-col justify-center items-center">
      <div
        className="flex sm:flex-col lg:flex-row align-top w-full h-fit justify-evenly"
        style={{ height: "60vh" }}
      >
        <CrateItemPresentation detailItem={detailItem} />

        <div className="">
          <CrateActionContainer detailItem={detailItem} />
        </div>
      </div>
    </div>
  );
}
