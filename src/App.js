import "./App.css";
import Navbar from "./components/Header";
import { actionTypes } from "./context/reducer";
import { useCallback, useEffect } from "react";
import { useContractsContext } from "./context/ContractProvider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketContainer from "./pages/market/MarketContainer";
import ProfileContainer from "./pages/profile/ProfileContainer";
import CratesContainer from "./pages/crates/CratesContainer";
import ItemPageContainer from "./pages/itemPage/ItemPageContainer";

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
        <Routes>
          <Route path="loot" element={<CratesContainer />} />
          <Route path="profile" element={<ProfileContainer />} />
          <Route path="token/:tokenId" element={<ItemPageContainer />} />
          <Route path="" element={<MarketContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
