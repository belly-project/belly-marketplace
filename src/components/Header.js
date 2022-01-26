import { Paper, styled } from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";
import { useContractsContext } from "../context/ContractProvider";
import { ethers } from "ethers";
import { actionTypes } from "../context/reducer";
import Web3Modal from "web3modal";

const NavbarContainer = styled(Paper)(({ theme }) => ({
  height: "10vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#11131B",
}));

export default function Navbar() {
  const [{ wallet }, dispatch] = useContractsContext();

  const connectToWallet = async () => {
    const web3Modal = new Web3Modal();
    const instance = await web3Modal.connect();
    const prov = new ethers.providers.Web3Provider(instance);
    const signer = prov.getSigner();

    const _wallet = await signer.getAddress();

    console.log(_wallet);
    dispatch({
      type: actionTypes.SET_WALLET,
      signer: signer,
      provider: prov,
      wallet: _wallet,
    });
  };
  return (
    <div className="sticky top-0 w-full items-start z-10">
      <div className="inline-flex w-full bg-black">
        {/*  {wallet !== "" ? (
        <Button variant="contained">
          {wallet.substring(0, 6)}...
          {wallet.substring(wallet.length - 6, wallet.lenght)}
        </Button>
      ) : (
        <Button variant="contained" onClick={() => connectToWallet()}>
          Connect Wallet
        </Button>
      )} */}
        <div className="my-3 mx-6">
          <Icon icon="mdi:alpha-b-circle-outline" color="white" fontSize={32} />
        </div>
        <a
          className="flex px-4 items-center cursor-pointer bg-[#232931] mx-4 hidden md:flex"
          href="/"
        >
          <Icon icon="healthicons:market-stall" color="white" />
          <h1 className="ml-2">Marketplace</h1>
        </a>
        <a
          className="flex px-2 items-center cursor-pointer bg-trasnparent mx-2 hidden md:flex"
          href="/"
        >
          <Icon icon="akar-icons:shipping-box-v2" color="white" />
          <h1 className="ml-2">Crates</h1>
        </a>
        <a
          className="flex px-2 items-center cursor-pointer bg-trasnparent mx-2 hidden md:flex"
          href="/"
        >
          <Icon icon="akar-icons:shipping-box-v2" color="white" />
          <h1 className="ml-2">Play The Game</h1>
        </a>
        <div className="hidden  md:flex ml-auto items-center">
          <div className="px-16"></div>
        </div>
        <a
          className="flex px-5 items-center cursor-pointer bg-[#046CFC] hidden md:flex"
          href="/login/"
        >
          <Icon icon="ic:twotone-login" color="white" />
          <div className="mt-2 mr-2"></div>
          Login
        </a>
      </div>
    </div>
  );
}
