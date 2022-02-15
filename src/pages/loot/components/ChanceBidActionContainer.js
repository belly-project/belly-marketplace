import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import ActionModal from "../../../components/ActionModal";
import MetamaskActionButton from "../../../components/MetamaskActionButton";
import { useContractsContext } from "../../../context/ContractProvider";

export default function ChanceBidActionContainer({ token }) {
  const [loading, setLoading] = useState(false);
  const [{ bellyChanceBidContract }] = useContractsContext();
  const addBidForChanceBid = async () => {
    console.log("HJE");
    let tx = await bellyChanceBidContract.enterChanceBid(
      token.itemId,
      bidValue
    );

    tx = await tx.wait();

    console.log(tx);
    setBidCompleted(true);
  };
  const [bidCompleted, setBidCompleted] = useState(false);
  const [bidValue, setBidValue] = useState(0);
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const goToInventory = () => {
    navigate("/profile/inventory");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    if (!loading) {
      setShowModal(false);
    }
  };
  return (
    <div className="w-full">
      <div className="flex items-center w-full flex-wrap md:justify-end">
        <div className="border-r border-gray-2 py-4 md:hidden">
          <div className="flex items-center text-gray-2 cursor-pointer pr-20">
            Auction info
          </div>
        </div>

        <div className="ml-24 text-right">
          <h3 className="break-all">
            {token.paidFor} / {token.total} BLY
          </h3>
        </div>

        <div className="ml-0 md:ml-8 mt-7 w-full md:w-auto md:mt-0">
          <div className="inline-block">
            <MetamaskActionButton
              text={"Add Bid"}
              _onClick={handleOpenModal}
              Modal={
                <ActionModal
                  item={token}
                  showModal={showModal}
                  action={addBidForChanceBid}
                  onceCompleted={goToInventory}
                  handleCloseModal={handleCloseModal}
                  completed={bidCompleted}
                  inputValue={bidValue}
                  setInputValue={setBidValue}
                  notCompletedText={{
                    msg: "Add your bid to have chances",
                    button: "Add Bid",
                  }}
                  completedText={{
                    msg: "Bid Completed!",
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
