import React from "react";
import { Icon } from "@iconify/react";
import { useContractsContext } from "../context/ContractProvider";
import { ethers } from "ethers";
import { actionTypes } from "../context/reducer";
import Web3Modal from "web3modal";
import WalletButton from "./WalletButton";
import NavbarItem from "./NavbarItem";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [{ wallet, web3Modal }, dispatch] = useContractsContext();

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
          text={"Open Crates"}
          location={location.pathname}
          to={"/loot"}
        />
        <div className="hidden  md:flex ml-auto items-center">
          <div className="px-16"></div>
        </div>
        <WalletButton wallet={wallet} connectToWallet={connectToWallet} />
      </div>
    </div>
  );
}
