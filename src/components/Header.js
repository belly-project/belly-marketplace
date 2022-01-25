import { Button, Container, Paper, Stack, styled } from "@mui/material";
import React, { useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { useLocation, useNavigate } from "react-router-dom";
import { useContractsContext } from "../context/ContractProvider";
import { ethers } from "ethers";
import { actionTypes } from "../context/reducer";
import Web3Modal from "web3modal";

const NavbarContainer = styled(Paper)(({ theme }) => ({
  height: "10vh",
  width: "87vw",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#0D1117",
  border: "1px solid gray",
}));

const NavbarLogoContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 0.2,
}));

const NavbarNavigationContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "250px",
}));

const NavbarOptionsContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 0.1,
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
    <NavbarContainer elevation={2}>
      {wallet !== "" ? (
        <Button variant="contained">
          {wallet.substring(0, 6)}...
          {wallet.substring(wallet.length - 6, wallet.lenght)}
        </Button>
      ) : (
        <Button variant="contained" onClick={() => connectToWallet()}>
          Connect Wallet
        </Button>
      )}
    </NavbarContainer>
  );
}
