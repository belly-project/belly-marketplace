import { Icon } from "@iconify/react";
import axios from "axios";
import { formatEther, parseEther } from "ethers/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { marketplaceApi } from "../../../context/axios";
import { useContractsContext } from "../../../context/ContractProvider";

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

export default function CrateItem({ detailItem }) {
  const [openCrate, setOpenCrate] = useState(false);
  const [crateSuceed, setCrateSucced] = useState(false);
  const [resultCrate, setResultCrate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const goToInventory = () => {
    navigate("/profile/inventory");
  };

  const handleOpenModal = (classString) => {
    setShowModal(true);
  };
  const handleCloseModal = (classString) => {
    setShowModal(false);
  };
  const navigate = useNavigate();

  const [
    { bellyDropsContract, bellyERC20Contract, bellyERC721Contract, wallet },
  ] = useContractsContext();

  const mintCrateToken = useCallback(
    async (randomResult) => {
      const resultCrate = await marketplaceApi.get(
        `getResultFromCase?random=${randomResult}`
      );

      const resultData = resultCrate.data;
      const tokenUri = resultData.tokenURI;
      if (tokenUri) {
        console.log(resultData);
        console.log("MINT CHARACTER");

        const mintTx = await bellyERC721Contract.mintBellyCharacter(
          0,
          bellyERC20Contract.address,
          tokenUri
        );
        let tx = await mintTx.wait();
        console.log(tx);
      }

      const tokenId = await bellyERC721Contract._tokenIds();

      const itemMinted = await bellyERC721Contract.allBellyCharacters(tokenId);

      const data = await fetchURI(itemMinted);

      console.log(data);
      return data;
    },
    [bellyERC20Contract.address, bellyERC721Contract]
  );

  const requestOpenCrate = async () => {
    const _approveTransaction = await bellyERC20Contract.approve(
      bellyDropsContract.address,
      parseEther("10")
    );

    let tx = await _approveTransaction.wait();
    setOpenCrate(true);

    const _buyCrateTransaction = await bellyDropsContract.openCrate(
      bellyERC20Contract.address,
      parseEther("10")
    );

    tx = await _buyCrateTransaction.wait();

    console.log(tx);
  };

  useEffect(() => {
    if (wallet !== "") {
      bellyDropsContract
        .once("CrateOpened", (random, event) => {
          if (openCrate) {
            setOpenCrate(false);
            mintCrateToken(random).then((res) => {
              console.log(res);
              setCrateSucced(true);
              setResultCrate(res);
            });
          }
        })
        .on("error", console.error);
    }
  }, [bellyDropsContract, mintCrateToken, openCrate, wallet]);
  return (
    <div className="mt-20 pb-20 sm:pb-32">
      <div className="mx-auto px-16 flex justify-center">
        <div
          className="block md:sticky md:inline-block md:w-1/2 align-top"
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
            <span className="flex px-8 rounded text-12  border border-transparent pt-1 pt-2, bg-[#3a3f50] border-transparent">
              {detailItem.crateId}
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
                src={detailItem.img}
                alt={detailItem.crateId}
                width="480"
                height="480"
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
                <h3 className="break-all">Ξ&nbsp;{detailItem.price}</h3>
                <h5 className="mt-4 text-[#a1a6b6] break-all">
                  ${detailItem.price}
                </h5>
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
                      <div className="ml-2">Buy Crate</div>
                    </div>
                  </button>
                  <ReactModal
                    appElement={document.getElementsByClassName("App")}
                    isOpen={showModal}
                    onRequestClose={handleCloseModal}
                    contentLabel="Minimal Modal Example"
                  >
                    {!crateSuceed ? (
                      <>
                        <div className="flex justify-between align-center">
                          <div>
                            <img
                              src={detailItem.img}
                              alt={detailItem.crateId}
                              width="128"
                              height="128"
                            />
                          </div>
                          <div>
                            <div className="flex flex-col items-center justify-between">
                              <h1 className="text-white">
                                Buy crate for 10 BLY ?
                              </h1>

                              <button
                                onClick={() => requestOpenCrate()}
                                className="mt-4 px-4 py-4 text-white relative rounded transition border border-gray text-gray-2"
                              >
                                <div className="flex items-center">
                                  <Icon
                                    icon="logos:metamask-icon"
                                    color="white"
                                  />
                                  {!openCrate ? (
                                    <div className="ml-2">Buy Crate</div>
                                  ) : (
                                    <div className="ml-2">Loading...</div>
                                  )}
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col justify-between align-center">
                          <div>
                            <img
                              src={resultCrate?.image}
                              alt={resultCrate?.tokenId}
                              width="128"
                              height="128"
                            />
                          </div>
                          <div>
                            <div className="flex flex-col items-center justify-between">
                              <h1 className="text-white">
                                Congrats you minted an:
                              </h1>
                              <h1 className="text-gray">{resultCrate?.name}</h1>
                              <button
                                onClick={() => goToInventory()}
                                className="mt-4 px-4 py-4 text-white relative rounded transition border border-gray text-gray-2"
                              >
                                <div className="flex items-center">
                                  <div>Go to inventory</div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </ReactModal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
