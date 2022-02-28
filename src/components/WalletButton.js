import { Icon } from "@iconify/react";
import React from "react";

export default function WalletButton({ wallet, connectToWallet }) {
  return (
    <>
      {wallet !== "" ? (
        <div
          disabled
          className="flex px-5 items-center cursor-pointer bg-[#046CFC]  lg:flex"
          style={{ pointerEvents: "none", cursor: "default" }}
        >
          <a
            href="/profile/inventory"
            className="flex items-center text-xs"
            style={{ pointerEvents: "auto", cursor: "pointer" }}
            disabled
          >
            <Icon icon="logos:metamask-icon" color="white" />
            <div className="mt-2 mr-2"></div>
            {wallet.substring(0, 2)}...
            {wallet.substring(wallet.length - 3, wallet.lenght)}
          </a>
        </div>
      ) : (
        <div
          disabled
          className="flex px-5 items-center cursor-pointer bg-[#046CFC] hidden md:flex"
          style={{ pointerEvents: "none", cursor: "default" }}
        >
          <button
            className="flex items-center"
            style={{ pointerEvents: "auto", cursor: "pointer" }}
            onClick={() => connectToWallet()}
          >
            <Icon icon="ic:twotone-login" color="white" />
            <div className="mt-2 mr-2"></div>
            Connect Wallet
          </button>
        </div>
      )}{" "}
    </>
  );
}
