import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useContractsContext } from "../../../context/ContractProvider.js";
import ActionModal from "../../../components/ActionModal.js";
import FaucetModal from "../../../components/FaucetModal.js";
import { useNavigate } from "react-router-dom";
import { localMarketplaceApi, marketplaceApi } from "../../../context/axios.js";
import { parseEther } from "ethers/lib/utils";
export default function ProfileSidebar() {
  const [{ wallet, balance }] = useContractsContext();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const openFaucetModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    window.location.reload(false);
  };
  const getFundsFromFaucet = async () => {
    setLoading(true);
    const res = await marketplaceApi.post("/faucetFundMe", {
      to: wallet,
      amount: parseEther("100"),
    });

    if (res.status === 204) {
      setLoading(false);
      setCompleted(true);
      setIsBlocked(true);
    } else {
      setLoading(false);
      setCompleted(true);
    }
  };

  const goToInventory = () => {
    handleCloseModal();
  };

  return (
    <div
      className="hidden md:flex flex-col flex-none border-[#3a3f50] border-r"
      style={{ height: "94vh", width: "280px" }}
    >
      <div className="w-full flex flex-col pt-6 px-12">
        <div className="rounded w-full pt-5 pb-5 px-2 border border-[#3a3f50] text-center">
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <h4 className="mr-4 text-lg font-medium">
                {wallet.substring(0, 4)}...
                {wallet.substring(wallet.length - 4)}
              </h4>
              <div className="hover:cursor-pointer">
                <Icon icon="bx:bx-edit" color="white" />
              </div>
            </div>
          </div>
          <small className="block mt-4 mb-4 text-gray-2 font-medium truncate"></small>
          <button className="px-2 py-2 relative rounded transition focus:outline-none border text-white border-gray-2 hover:border-[#a1a6b6] active:border-[#3a3f50] bg-gray-5 hover:bg-gray-4 active:bg-gray-6">
            <span className="visible">
              <div className="flex items-center">
                <Icon icon="ri:copper-coin-fill" color="#cd7f32" />
                <span className="ml-2">{balance} BLY</span>
              </div>
            </span>
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col pt-2">
        <div className="flex-1 px-4">
          <a
            className="relative mt-4 px-2 py-4 rounded flex flex-row items-center cursor-pointer bg-[#3a3f50]"
            href="/profile/inventory/"
          >
            <Icon icon="ic:round-inventory-2" color="white" />
            <h6 className="ml-2 text-sx">Inventory</h6>
          </a>
          <a
            className="relative mt-4 px-2 py-4 rounded flex flex-row items-center cursor-pointer"
            href="/profile/activity/"
          >
            <Icon icon="ph:activity-bold" color="white" />
            <h6 className="ml-2 text-sx">Activity</h6>
          </a>
          <button
            className="relative mt-4 px-2 py-4 rounded flex flex-row items-center cursor-pointer"
            onClick={() => openFaucetModal()}
          >
            <Icon icon="jam:medal-f" color="#white" />
            <h6 className="ml-2 text-sx">Claim Tokens</h6>
            <FaucetModal
              loading={loading}
              showModal={showModal}
              action={getFundsFromFaucet}
              onceCompleted={goToInventory}
              handleCloseModal={handleCloseModal}
              completed={completed}
              isBlocked={isBlocked}
              notCompletedText={{
                msg: "Request 100 BLY for your account",
                button: "Get BELLY",
              }}
              completedText={{
                msg: `You recieved 100 BLY!`,
                button: "Go to Inventory",
              }}
            />
          </button>
          <a
            className="relative mt-4 px-2 py-4 rounded flex flex-row items-center cursor-pointer cursor-not-allowed"
            href="/profile/inventory/axie/"
            style={{ opacity: 0.3 }}
          >
            <Icon icon="ci:settings-filled" color="white" />
            <h6 className="ml-2 text-sx">Account Settings</h6>
          </a>
        </div>
        <a
          href="/"
          className="mt-4 px-4 py-4 flex flex-row items-center cursor-pointer border-t border-[#3a3f50] text-danger-4"
        >
          <Icon icon="ls:logout" color="red" />
          <h6 className="ml-2 text-sx">Log out</h6>
        </a>
      </div>
    </div>
  );
}
