import { Icon } from "@iconify/react";
import axios from "axios";
import { formatEther, parseEther } from "ethers/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { marketplaceApi } from "../../../context/axios.js";
import { useContractsContext } from "../../../context/ContractProvider.js";

const fetchURI = async (item) => {
  const tokenURI = item[2];
  let result = [];
  await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, description, weapons, image } = res.data;

      let _item = {
        tokenId: parseInt(item[0].toHexString().toString(16)),
        itemURI: tokenURI,
        image: image,
        name: name,
        _class: res.data.class,
        description: description,
        weapons: weapons,
        stats: res.data.keyvalues,
        price: formatEther(item[6]),
        owner: item[4],
      };
      result = _item;
    } else {
      console.log("EII");
    }
  });
  return result;
};

export default function ChanceBidItem({ detailItem }) {
  const [bidValue, setBidValue] = useState(0);
  const [bidsForItem, setBidsForItem] = useState([]);
  const [bidCompleted, setBidCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const goToInventory = () => {
    navigate("/profile/inventory");
  };

  const formatPercentatge = (item) => {
    let myBid = parseFloat(item[0].toString());
    let total = parseFloat(detailItem[3].toString());
    let perc = (myBid / total) * 100;

    return perc;
  };

  const handleOpenModal = (classString) => {
    setShowModal(true);
  };
  const handleCloseModal = (classString) => {
    setShowModal(false);
  };
  const navigate = useNavigate();

  const [
    { bellyChanceBidContract, bellyERC20Contract, bellyERC721Contract, wallet },
  ] = useContractsContext();

  const fetchBidsForItem = useCallback(
    async (detailItem) => {
      const bids = await bellyChanceBidContract.getBidsForItem(
        detailItem[0].toString()
      );
      console.log(bids);
      return bids;
    },
    [bellyChanceBidContract]
  );

  const addBidForChanceBid = async (item) => {
    let tx = await bellyChanceBidContract.enterChanceBid(
      detailItem[0].toString(),
      bidValue
    );

    tx = await tx.wait();

    console.log(tx);
    setBidCompleted(true);
  };

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
              #00000000{detailItem[0].toString()}
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
        <div className="block max-w-md md:inline-block md:w-50 align-top">
          <div className="w-full">
            <div className="flex items-center w-full flex-wrap md:justify-end">
              <div className="border-r border-gray-2 py-4 md:hidden">
                <div className="flex items-center text-gray-2 cursor-pointer pr-20">
                  Auction info
                </div>
              </div>

              <div className="ml-24 text-right">
                <h3 className="break-all">
                  {detailItem[4].toString()} / {detailItem[3].toString()} BLY
                </h3>
              </div>

              <div className="ml-0 md:ml-8 mt-7 w-full md:w-auto md:mt-0">
                <div className="inline-block">
                  <button
                    onClick={
                      () =>
                        handleOpenModal() /*(isOwner ? putItemforSale() : buyToken())*/
                    }
                    className="px-4 py-4 relative rounded transition  border  border-[#3a3f50] text-gray-2"
                  >
                    <div className="flex items-center">
                      <Icon icon="logos:metamask-icon" color="white" />
                      <div className="ml-2">Add Bid</div>
                    </div>
                  </button>
                  <ReactModal
                    appElement={document.getElementsByClassName("App")}
                    isOpen={showModal}
                    onRequestClose={handleCloseModal}
                    contentLabel="Minimal Modal Example"
                  >
                    <>
                      <div className="flex justify-between align-center">
                        <div>
                          <img
                            src={
                              detailItem.img
                                ? detailItem.img
                                : "https://i.redd.it/udq9asephmpy.png"
                            }
                            alt={detailItem.crateId}
                            width="128"
                            height="128"
                          />
                        </div>
                        {bidCompleted ? (
                          <div>
                            <div className="flex flex-col items-center justify-between">
                              <h1 className="text-white">Bid completed!</h1>

                              <button
                                onClick={() => goToInventory()}
                                className="mt-4 px-4 py-4 text-white relative rounded transition border border-gray text-gray-2"
                              >
                                <div className="flex items-center">
                                  <div className="ml-2">Go to Inventory</div>
                                </div>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex flex-col items-center justify-between">
                              <h1 className="text-white">
                                Add bid and have chances to win
                              </h1>
                              <input
                                type="number"
                                onChange={(e) => setBidValue(e.target.value)}
                                value={bidValue}
                              />

                              <button
                                onClick={() => addBidForChanceBid()}
                                className="mt-4 px-4 py-4 text-white relative rounded transition border border-gray text-gray-2"
                              >
                                <div className="flex items-center">
                                  <Icon
                                    icon="logos:metamask-icon"
                                    color="white"
                                  />
                                  <div className="ml-2">Add Bid</div>
                                </div>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  </ReactModal>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-8 flex-col justify-center items-end w-full">
            <div className="font-bold text-xl leading-24 text-white mb-4">
              Latest Chance Bids Completed
            </div>
            {bidsForItem?.map((item) => {
              return (
                <div
                  key={item.name}
                  className="flex jusify-evenly w-fit mt-2 my-4 py-4 px-4 sm:px-4 sm:py-4 bg-color-[#282b39] border border-[#3a3f50] bg-[#282b39] rounded-lg"
                >
                  <div>
                    <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
                      Owner
                    </div>
                    <div className="mt-4 text-white font-bold leading-14 text-xs tracking-1 uppercase">
                      {item[1].substring(0, 4)}...
                      {item[1].substring(wallet.length - 4)}
                    </div>
                  </div>
                  <div className="ml-8">
                    <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
                      BLY Paid
                    </div>
                    <div className="mt-4 text-white font-bold leading-14 text-xs tracking-1 uppercase">
                      {item[0].toString()} BLY
                    </div>
                  </div>
                  <div className="ml-8">
                    <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
                      Pertentatge
                    </div>
                    <div className="mt-4 text-white font-bold leading-14 text-xs tracking-1 uppercase">
                      {formatPercentatge(item)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
