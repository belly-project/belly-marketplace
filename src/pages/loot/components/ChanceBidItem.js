import { Icon } from "@iconify/react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyableItemWrapper from "../../../components/BuyableItemWrapper.js";
import { useContractsContext } from "../../../context/ContractProvider.js";
import { chanceBidFor } from "../../../context/utils.js";
import ChanceBidActionContainer from "./ChanceBidActionContainer.js";
import ChanceBidItemInfo from "./ChanceBidItemInfo.js";

export default function ChanceBidItem({ detailItem }) {
  // eslint-disable-next-line no-unused-vars
  const [bidsForItem, setBidsForItem] = useState([]);

  const navigate = useNavigate();

  const [{ bellyChanceBidContract, wallet }] = useContractsContext();

  const fetchBidsForItem = useCallback(
    async (detailItem) => {
      const bids = await bellyChanceBidContract.getBidsForItem(
        detailItem.itemId
      );
      let formattedItems = [];
      formattedItems = await Promise.all(
        bids.map(async (item) => {
          return await chanceBidFor(item, detailItem);
        })
      );
      return formattedItems;
    },
    [bellyChanceBidContract]
  );

  useEffect(() => {
    if (wallet !== "") {
      fetchBidsForItem(detailItem).then((res) => {
        setBidsForItem(res);
      });
    }
  }, [bellyChanceBidContract, detailItem, fetchBidsForItem, wallet]);

  return (
    <div className="mt-20 pb-20 sm:pb-32">
      <div className="mx-auto px-4 flex justify-center">
        <div
          className="block md:sticky md:inline-block md:w-2/3 align-top"
          style={{ top: "120px" }}
        >
          <div
            role="button"
            className="inline-flex items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <Icon icon="bx:bx-arrow-back" color="white" />
          </div>
          <br />
          <div className="mt-8 leading-16 inline-flex item-center">
            <span className="flex px-2 rounded text-12  border border-transparent pt-1 pt-2, bg-[#3a3f50] border-transparent">
              #{detailItem.itemId}
            </span>
          </div>
          <div className="text-28 flex items-end"></div>
          <div className="w-full my-auto">
            <div
              className="relative pointer-events-none"
              style={{ width: "480px", height: "480px", marginLeft: "30px" }}
            >
              <img
                className="mt-5"
                src={
                  detailItem.img
                    ? detailItem.img
                    : "https://i.redd.it/udq9asephmpy.png"
                }
                alt={detailItem.crateId}
                width="240"
                height="240"
              />
            </div>
          </div>
        </div>
        <BuyableItemWrapper
          ItemAction={ChanceBidActionContainer}
          ItemInfo={ChanceBidItemInfo}
          detailItem={detailItem}
        />
      </div>
    </div>
  );
}
