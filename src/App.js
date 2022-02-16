import "./App.css";
import Navbar from "./components/Navbar";
import { actionTypes } from "./context/reducer";
import { useCallback, useEffect } from "react";
import { useContractsContext } from "./context/ContractProvider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketContainer from "./pages/market/MarketContainer.js";
import ProfileContainer from "./pages/profile/ProfileContainer.js";
import LootContainer from "./pages/loot/LootContainer.js";
import ItemPageContainer from "./pages/itemPage/ItemPageContainer.js";
import ReactModal from "react-modal";

ReactModal.defaultStyles.overlay.backgroundColor = "rgba(10, 11, 15, 0.99)";
ReactModal.defaultStyles.content.background = "#3a3f50";
ReactModal.defaultStyles.content.width = "30%";
ReactModal.defaultStyles.content.height = "fit-content";
ReactModal.defaultStyles.content.margin = "auto";

function App() {
  const [{ wallet }, dispatch] = useContractsContext();

  const connectToWallet = useCallback(async () => {
    const web3Modal = new Web3Modal();
    const instance = await web3Modal.connect();
    const prov = new ethers.providers.Web3Provider(instance);
    const signer = prov.getSigner();

    const _wallet = await signer.getAddress();

    return {
      provider: prov,
      signer: signer,
      wallet: _wallet,
      web3Modal: web3Modal,
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
        {wallet !== "" && (
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
