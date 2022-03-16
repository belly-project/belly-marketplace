import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useContractsContext } from "../context/ContractProvider";
import { ethers } from "ethers";
import { actionTypes } from "../context/reducer";
import Web3Modal from "web3modal";
import WalletButton from "./WalletButton";
import NavbarItem from "./NavbarItem";
import { useLocation } from "react-router-dom";
import { formatEther } from "ethers/lib/utils";
import { bellyErc20 } from "../context/contracts/addresses";
import NavbarHelpItem from "./NavbarHelpItem";
import { configData } from "../configData";

export default function Navbar() {
  const location = useLocation();
  const [showHelp, setShowHelp] = useState(false);
  const [
    { wallet, balance, web3Modal, bellyERC20Contract, correctChain },
    dispatch,
  ] = useContractsContext();

  const closeModal = () => {
    setShowHelp(false);
  };

  const addToken = async () => {
    const tokenAddress = "0xa035dFb92Fb3a3Dd8Be8ad5E2E8E5B872D940B7F";
    const tokenSymbol = "BLY";
    const tokenDecimals = 18;

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
          },
        },
      });

      if (wasAdded) {
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWalletBalance = useCallback(async () => {
    const _balance = await bellyERC20Contract.balanceOf(wallet);
    return { balance: formatEther(_balance) };
  }, [bellyERC20Contract, wallet]);

  const connectToWallet = async () => {
    const _web3Modal = new Web3Modal();
    const instance = await _web3Modal.connect();
    const prov = new ethers.providers.Web3Provider(instance);
    const signer = prov.getSigner();

    const _wallet = await signer.getAddress();

    dispatch({
      type: actionTypes.SET_WALLET,
      signer: signer,
      provider: prov,
      web3Modal: web3Modal,
      wallet: _wallet,
    });
  };

  return (
    <div className="sticky top-0 w-full items-start z-10 border-b border-primary-3 ">
      <div className="flex w-full sm:justify-between bg-gray-6 bg-opacity-50 h-fit">
        <a href="/">
          <div className="my-3 mx-6 cursor-pointer">
            <Icon icon="map:museum" color="white" fontSize={28} />
          </div>
        </a>
        <NavbarHelpItem
          icon={"map:compass"}
          to={"help"}
          location={location.pathname}
          setShowHelpModal={setShowHelp}
          showHelpModal={showHelp}
          closeModal={closeModal}
          disabled={true}
        />
        {configData.pages?.map((page) => {
          return (
            <NavbarItem
              key={Math.random(0, 999)}
              icon={page.icon}
              text={page.name}
              to={page.route}
              location={location.pathname}
              disabled={page.disabled}
            />
          );
        })}

        <div className="hidden lg:flex flex ml-auto items-center">
          <div className="px-2">
            <div className="flex flex-col items-center justify-center"></div>
          </div>
          <div className="px-2">
            <div className="hidden lg:flex items-center justify-center">
              <div className="mr-2">
                <Icon icon="entypo:wallet" color="white" />
              </div>
              <div className="flex items-center justify-center ">
                <small className="px-4">
                  {balance} {configData.chainInfo?.coinCurrency}
                </small>
                <div className="cursor-pointer"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden 2sm:flex">
          <WalletButton wallet={wallet} connectToWallet={connectToWallet} />
        </div>
      </div>
    </div>
  );
}
