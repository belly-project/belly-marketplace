import React, { useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useContractsContext } from "../context/ContractProvider";
import { ethers } from "ethers";
import { actionTypes } from "../context/reducer";
import Web3Modal from "web3modal";
import WalletButton from "./WalletButton";
import NavbarItem from "./NavbarItem";
import { useLocation } from "react-router-dom";
import { formatEther } from "ethers/lib/utils";
import { bellyErc20, bellyErc721 } from "../context/contracts/addresses";

export default function Navbar() {
  const location = useLocation();
  const [
    { wallet, balance, web3Modal, bellyERC20Contract, correctChain },
    dispatch,
  ] = useContractsContext();

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

  useEffect(() => {
    if (wallet !== "") {
      if (correctChain) {
        getWalletBalance().then((res) => {
          dispatch({
            type: actionTypes.SET_BALANCE,
            balance: res.balance,
          });
        });
      }
    }
  }, [correctChain, dispatch, getWalletBalance, location.pathname, wallet]);
  return (
    <div className="sticky top-0 w-full items-start z-10">
      <div className="inline-flex w-full bg-black">
        <div className="my-3 mx-6">
          <Icon icon="mdi:alpha-b-circle-outline" color="white" fontSize={32} />
        </div>
        <NavbarItem
          icon={"map:storage"}
          text={"Inventory"}
          to={"/profile/inventory"}
          location={location.pathname}
        />
        <NavbarItem
          icon={"map:grocery-or-supermarket"}
          text={"Marketplace"}
          to={"/"}
          location={location.pathname}
        />
        <NavbarItem
          icon={"map:jewelry-store"}
          text={"Belly Loot"}
          location={location.pathname}
          to={"/loot"}
        />
        <NavbarItem
          icon={"map:museum"}
          text={"Battleground"}
          to={"/battle"}
          location={location.pathname}
          disabled={true}
        />
        <div className="hidden  md:flex ml-auto items-center">
          <div className="px-2">
            <div className="flex flex-col items-center justify-center">
              {balance < 0.0 && (
                <div className="mr-4 flex ">
                  <div className="flex items-center mr-4">
                    <div>BellyToken</div>
                    <Icon
                      className="animate-bounce mx-2 cursor-pointer hover:animate-ping"
                      onClick={() => addToken(bellyErc20)}
                      icon="gg:import"
                      color="white"
                      width={24}
                    />
                  </div>

                  <div className="mr- text-[#a1a6b6]">
                    {bellyErc20.substring(0, 4)}...
                    {bellyErc20.substring(wallet.length - 4)}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="px-2">
            <div className="flex items-center justify-center">
              <div className="mr-2">
                <Icon icon="entypo:wallet" color="white" />
              </div>
              <div className="flex items-center justify-center">
                <small className="px-4">{balance} BLY</small>
                <div className="cursor-pointer"></div>
              </div>
            </div>
          </div>
        </div>
        <WalletButton wallet={wallet} connectToWallet={connectToWallet} />
      </div>
    </div>
  );
}
