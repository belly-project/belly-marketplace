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

export default function Navbar() {
  const location = useLocation();
  const [{ wallet, balance, web3Modal, bellyERC20Contract }, dispatch] =
    useContractsContext();

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
      getWalletBalance().then((res) => {
        dispatch({
          type: actionTypes.SET_BALANCE,
          balance: res.balance,
        });
      });
    }
  }, [dispatch, getWalletBalance, wallet]);
  return (
    <div className="sticky top-0 w-full items-start z-10">
      <div className="inline-flex w-full bg-black">
        <div className="my-3 mx-6">
          <Icon icon="mdi:alpha-b-circle-outline" color="white" fontSize={32} />
        </div>
        <NavbarItem
          icon={"healthicons:market-stall"}
          text={"Marketplace"}
          to={"/"}
          location={location.pathname}
        />
        <NavbarItem
          icon={"akar-icons:shipping-box-v2"}
          text={"Belly Loot"}
          location={location.pathname}
          disabled
          to={"/loot"}
        />
        <div className="hidden  md:flex ml-auto items-center">
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
