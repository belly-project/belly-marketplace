import { parseEther } from "ethers/lib/utils";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionModal from "../../../components/ActionModal";
import MetamaskActionButton from "../../../components/MetamaskActionButton";
import { useContractsContext } from "../../../context/ContractProvider";

export default function ItemPageActionContainer({ detailItem }) {
  const [showModal, setShowModal] = useState(false);
  const [itemBought, setItemBought] = useState(false);
  const [loading, setLoading] = useState(false);
  const [priceForItem, setPriceForItem] = useState(0.0);

  const [{ bellyERC721Contract, bellyERC20Contract, wallet, balance }] =
    useContractsContext();

  const navigate = useNavigate();
  const goToInventory = () => {
    navigate("/profile/inventory");
  };

  const buyToken = async () => {
    setLoading(true);
    const _approveTransaction = await bellyERC20Contract.approve(
      bellyERC721Contract.address,
      parseEther(detailItem.price)
    );

    let tx = await _approveTransaction.wait();

    const _buyTokenTransaction = await bellyERC721Contract.buyToken(
      wallet,
      bellyERC20Contract.address,
      detailItem.tokenId,
      parseEther(detailItem.price)
    );

    tx = await _buyTokenTransaction.wait();

    setLoading(false);
    setItemBought(true);
  };

  const putItemforSale = async () => {
    setLoading(true);
    const transcation = await bellyERC721Contract.toggleForSale(
      detailItem.tokenId,
      parseEther(priceForItem.toString())
    );

    await transcation.wait();

    setLoading(false);

    setItemBought(true);
  };

  const saveItemInInventory = async () => {
    setLoading(true);
    const transcation = await bellyERC721Contract.toggleForSale(
      detailItem.tokenId,
      parseEther(priceForItem.toString())
    );

    await transcation.wait();

    setLoading(false);

    setItemBought(true);
  };

  const handleOpenModal = (classString) => {
    setShowModal(true);
  };
  const handleCloseModal = (classString) => {
    if (!loading) {
      setShowModal(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center w-full flex-wrap md:justify-end">
        <div className="ml-24 text-right">
          <h3 className="break-all">Ξ&nbsp;{detailItem.price}</h3>
          <h5 className="mt-4 text-[#a1a6b6] break-all">${detailItem.price}</h5>
        </div>

        <div className="ml-0 md:ml-8 mt-7 w-full md:w-auto md:mt-0">
          <div className="inline-block">
            <MetamaskActionButton
              stlye={{ display: loading ? "none" : "flex" }}
              text={
                wallet !== detailItem.owner
                  ? "Buy Item"
                  : `${detailItem.forSale ? "Save Item" : "Sell Item"}`
              }
              _onClick={handleOpenModal}
              Modal={
                <ActionModal
                  item={detailItem}
                  showModal={showModal}
                  action={
                    wallet !== detailItem.owner
                      ? detailItem.price > balance
                        ? undefined
                        : buyToken
                      : detailItem.forSale
                      ? saveItemInInventory
                      : putItemforSale
                  }
                  onceCompleted={goToInventory}
                  handleCloseModal={handleCloseModal}
                  completed={itemBought}
                  inputValue={
                    wallet !== detailItem.owner
                      ? undefined
                      : detailItem.forSale
                      ? undefined
                      : priceForItem
                  }
                  setInputValue={
                    wallet !== detailItem.owner
                      ? undefined
                      : detailItem.forSale
                      ? undefined
                      : setPriceForItem
                  }
                  disabledAction={detailItem.price > balance}
                  loading={loading}
                  image={detailItem.image}
                  notCompletedText={{
                    msg: `${
                      wallet !== detailItem.owner
                        ? `Buy for ${detailItem.price} BLY`
                        : `${
                            detailItem.forSale
                              ? "Delete item from market and save it in Inventory"
                              : "Add Item for sale"
                          }`
                    }`,
                    button: `${
                      wallet !== detailItem.owner
                        ? `${
                            detailItem.price > balance
                              ? "Not Enough BELLY"
                              : "Buy Item"
                          }`
                        : `${detailItem.forSale ? "Save Item" : "Sell Item"}`
                    }
                    `,
                  }}
                  completedText={{
                    msg: `${
                      wallet !== detailItem.owner
                        ? "Item Bought!"
                        : `${
                            detailItem.forSale
                              ? "Item saved in Inventory"
                              : "Item on Sale!"
                          }`
                    }`,
                    button: "Go to Inventory",
                  }}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
