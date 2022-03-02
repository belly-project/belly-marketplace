import { parseEther } from "ethers/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionModal from "../../../components/modals/ActionModal";
import MetamaskActionButton from "../../../components/MetamaskActionButton";
import { marketplaceApi } from "../../../context/axios";
import { useContractsContext } from "../../../context/ContractProvider";
import { basicFetchURI } from "../../../context/utils";

export default function CrateActionContainer({ detailItem }) {
  const [resultCrate, setResultCrate] = useState(null);
  const [openCrate, setOpenCrate] = useState(false);
  const [crateSuceed, setCrateSucced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [
    {
      bellyDropsContract,
      balance,
      bellyERC20Contract,
      bellyERC721Contract,
      wallet,
    },
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

    await _approveTransaction.wait();

    const _buyCrateTransaction = await bellyDropsContract.openCrate(
      bellyERC20Contract.address,
      parseEther("10")
    );

    await _buyCrateTransaction.wait();
  };

  const mintCrateToken = useCallback(
    async (randomResult) => {
      const resultCrate = await marketplaceApi.get(
        `getResultFromCase?random=${randomResult}`
      );

      const resultData = resultCrate.data;
      const tokenURI = resultData.tokenURI;

      if (tokenURI) {
        const mintTx = await bellyERC721Contract.mintBellyCharacter(
          0,
          wallet,
          tokenURI
        );
        await mintTx.wait();
      }

      const tokenId = await bellyERC721Contract._tokenIds();

      const itemMinted = await bellyERC721Contract.allBellyCharacters(tokenId);

      const data = await basicFetchURI(itemMinted);

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
    <div className="w-full">
      <div className="flex items-center py-4 w-full md:justify-end  ">
        <div className="text-right md:p-0">
          <h3 className="">Ξ&nbsp;{detailItem.price}</h3>
          <h5 className="mt-4 text-gray-1 ">${detailItem.price}</h5>
        </div>

        <div className="ml-7 w-full md:mt-0 ">
          <MetamaskActionButton
            text={"Buy Crate"}
            _onClick={detailItem.price > balance ? undefined : handleOpenModal}
            disabled={detailItem.price > balance}
            Modal={
              <ActionModal
                disabledAction={detailItem.price > balance}
                item={detailItem}
                loading={loading}
                showModal={showModal}
                action={requestOpenCrate}
                onceCompleted={goToInventory}
                handleCloseModal={handleCloseModal}
                completed={crateSuceed}
                notCompletedText={{
                  msg: "Open Crate for 10 BLY",
                  button: `${
                    detailItem.price > balance
                      ? "Not Enough BELLY"
                      : "Open Crate"
                  }`,
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
  );
}
