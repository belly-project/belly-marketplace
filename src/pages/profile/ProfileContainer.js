import React from "react";
import { useContractsContext } from "../../context/ContractProvider";
import MarketItem from "../market/components/MarketItem";
import InventoryFilters from "./components/InventoryFilters";
import ProfileSidebar from "./components/ProfileSidebar";

export default function ProfileContainer() {
  const [{ wallet, myItems }] = useContractsContext();
  return (
    <div className="flex flex-row">
      <ProfileSidebar wallet={wallet} />
      <div className="flex flex-col w-full mt-10">
        <div
          className="overflow-x-auto flex-1 px-8 py-4 md:px-32 md:py-0"
          style={{ maxHeight: "100vh" }}
        >
          <div className="w-full h-full relative">
            <div className="w-full h-full relative">
              <InventoryFilters />

              <div className="flex mt-8 flex-wrap justify-center w-full">
                {myItems?.map((item) => {
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
