import "./App.css";
import Navbar from "./components/Navbar";
import { actionTypes } from "./context/reducer";
import { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "./context/ContractProvider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketContainer from "./pages/market/MarketContainer.js";
import ProfileContainer from "./pages/profile/ProfileContainer.js";
import LootContainer from "./pages/loot/LootContainer.js";
import ItemPageContainer from "./pages/itemPage/ItemPageContainer.js";
import ReactModal from "react-modal";
import ActionModal from "./components/ActionModal";

ReactModal.defaultStyles.overlay.backgroundColor = "rgba(10, 11, 15, 0.99)";
ReactModal.defaultStyles.content.background = "#3a3f50";
ReactModal.defaultStyles.content.width = "30%";
ReactModal.defaultStyles.content.height = "fit-content";
ReactModal.defaultStyles.content.margin = "auto";

let currentAccount = null;

// For now, 'eth_accounts' will continue to always return an array

export const addToken = async () => {
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
      console.log("Thanks for your interest!");
    } else {
      console.log("Your loss!");
    }
  } catch (error) {
    console.log(error);
  }
};

function App() {
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
      console.log("KEKO");
      currentAccount = accounts[0];
      window.location.reload();
      // Do any other work!
    }
  }
  window.ethereum.on("accountsChanged", handleAccountsChanged);

  function handleChainChanged(_chainId) {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload();
  }
  window.ethereum.on("chainChanged", handleChainChanged);

  const [showModal, setShowModal] = useState(false);
  const [{ wallet, correctChain }, dispatch] = useContractsContext();

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const connectToWallet = useCallback(async () => {
    const web3Modal = new Web3Modal();
    const instance = await web3Modal.connect();
    const prov = new ethers.providers.Web3Provider(instance);
    const signer = prov.getSigner();

    const _wallet = await signer.getAddress();
    currentAccount = _wallet;
    let chainId = await signer.getChainId();

    let correctChain = true;
    if (chainId !== 80001) {
      correctChain = false;
      handleOpenModal(true);
    }
    return {
      provider: prov,
      signer: signer,
      wallet: _wallet,
      web3Modal: web3Modal,
      correctChain: correctChain,
    };
  }, []);

  useEffect(() => {
    connectToWallet().then((res) => {
      dispatch({
        type: actionTypes.SET_WALLET,
        signer: res.signer,
        provider: res.provider,
        wallet: res.wallet,
        web3Modal: res.web3Modal,
        balance: res.balance,
        correctChain: res.correctChain,
      });
    });

    return () => {
      return;
    };
  }, [connectToWallet, dispatch, wallet]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {!correctChain && (
          <ReactModal
            appElement={document.getElementsByClassName("App")}
            isOpen={showModal}
            onRequestClose={handleCloseModal}
            contentLabel="Minimal Modal Example"
          >
            <>
              <div className="flex justify-between align-center">
                <h1 className="text-white">PLEASE CONNECT TO MUMBAI!!!</h1>
              </div>
            </>
          </ReactModal>
        )}
        {wallet !== "" && correctChain && (
          <Routes>
            <Route path="loot" element={<LootContainer />} />

            <Route path="profile/inventory" element={<ProfileContainer />} />

            <Route
              path="profile/inventory/:tokenId"
              element={<ItemPageContainer />}
            />
            <Route path="token/:tokenId" element={<ItemPageContainer />} />
            <Route path="" element={<MarketContainer />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
