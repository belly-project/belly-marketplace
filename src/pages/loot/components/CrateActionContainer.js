import { parseEther } from "ethers/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionModal from "../../../components/ActionModal";
import MetamaskActionButton from "../../../components/MetamaskActionButton";
import { localMarketplaceApi, marketplaceApi } from "../../../context/axios";
import { useContractsContext } from "../../../context/ContractProvider";
import { basicFetchURI } from "../../../context/utils";

export default function CrateActionContainer({ detailItem }) {
  const [resultCrate, setResultCrate] = useState(null);
  const [openCrate, setOpenCrate] = useState(false);
  const [crateSuceed, setCrateSucced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [
    { bellyDropsContract, bellyERC20Contract, bellyERC721Contract, wallet },
  ] = useContractsContext();

  const goToInventory = () => {
    navigate("/profile/inventory");
  };

  const handleOpenModal = (classString) => {
    setShowModal(true);
  };
  const handleCloseModal = (classString) => {
    if (!loading) {
      setShowModal(false);
    }
  };
  const navigate = useNavigate();

  const requestOpenCrate = async () => {
    setLoading(true);
    setOpenCrate(true);
    const _approveTransaction = await bellyERC20Contract.approve(
      bellyDropsContract.address,
      parseEther("10")
    );

    let tx = await _approveTransaction.wait();

    const _buyCrateTransaction = await bellyDropsContract.openCrate(
      bellyERC20Contract.address,
      parseEther("10")
    );

    tx = await _buyCrateTransaction.wait();

    console.log(tx);
  };

  const mintCrateToken = useCallback(
    async (randomResult) => {
      const resultCrate = await marketplaceApi.get(
        `getResultFromCase?random=${randomResult}`
      );

      const resultData = resultCrate.data;
      const tokenURI = resultData.tokenURI;
      console.log(resultData);
      if (tokenURI) {
        const mintTx = await bellyERC721Contract.mintBellyCharacter(
          0,
          wallet,
          tokenURI
        );
        let tx = await mintTx.wait();
        console.log(tx);
      }

      const tokenId = await bellyERC721Contract._tokenIds();

      const itemMinted = await bellyERC721Contract.allBellyCharacters(tokenId);

      const data = await basicFetchURI(itemMinted);

      console.log("KE");
      await marketplaceApi.post("addCrateResult", {
        crateId: 1,
        mintedBy: wallet,
        price: 10,
        tokenURI,
      });

      setLoading(false);

      return data;
    },
    [bellyERC721Contract, wallet]
  );

  useEffect(() => {
    if (wallet !== "") {
      bellyDropsContract
        .once("CrateOpened", (random, requester) => {
          if (openCrate) {
            if (requester === wallet) {
              console.log("K");
              mintCrateToken(random).then((res) => {
                setOpenCrate(false);
                setCrateSucced(true);
                setResultCrate(res);
              });
            }
          }
        })
        .on("error", console.error);
    }
  }, [bellyDropsContract, mintCrateToken, openCrate, wallet]);

  return (
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
              <MetamaskActionButton
                text={"Buy Crate"}
                _onClick={handleOpenModal}
                Modal={
                  <ActionModal
                    item={detailItem}
                    loading={loading}
                    showModal={showModal}
                    action={requestOpenCrate}
                    onceCompleted={goToInventory}
                    handleCloseModal={handleCloseModal}
                    completed={crateSuceed}
                    notCompletedText={{
                      msg: "Open Crate for 10 BLY",
                      button: "Open Crate",
                    }}
                    completedText={{
                      msg: `{Crate Opened!, you got a ${resultCrate?.name}}`,
                      button: "Go to Inventory",
                    }}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
