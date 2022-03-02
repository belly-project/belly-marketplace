import { Icon } from "@iconify/react";
import React from "react";

export default function WalletButton({ wallet, type, connectToWallet }) {
  return (
    <>
      {wallet !== "" ? (
        <div
          disabled
          className={`px-5 ${
            type === "round" ? "p-5 rounded-full" : ""
          }  items-center cursor-pointer bg-[#046CFC]  sm:flex `}
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
            {wallet.substring(0, 4)}...
            {wallet.substring(wallet.length - 3, wallet.lenght)}
          </a>
        </div>
      ) : (
        <div
          disabled
          className="px-5 items-center cursor-pointer bg-[#046CFC]  flex"
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
