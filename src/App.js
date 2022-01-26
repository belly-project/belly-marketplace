import "./App.css";
import Navbar from "./components/Header";
import { formatEther } from "ethers/lib/utils";
import { actionTypes } from "./context/reducer";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useContractsContext } from "./context/ContractProvider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketContainer from "./pages/market/MarketContainer";
import ProfileContainer from "./pages/profile/ProfileContainer";
import CratesContainer from "./pages/crates/CratesContainer";

const fetchURI = async (item) => {
  const tokenURI = item[2];
  let result = [];
  await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, image } = res.data;
      let _item = {
        tokenId: parseInt(item[0], 18),
        itemURI: tokenURI,
        image: image.split("?")[0],
        name: name,
        price: formatEther(item[6]),
        owner: item[4],
      };
      result = _item;
    } else {
      console.log("EII");
    }
  });
  return result;
};
function App() {
  const [{ bellyERC721Contract, wallet }, dispatch] = useContractsContext();
  const fetchMarketItemsData = useCallback(async () => {
    const _response = await bellyERC721Contract.getItemsForSale({});
    let formattedItems = [];
    formattedItems = await Promise.all(
      _response.map(async (item) => {
        return await fetchURI(item);
      })
    );
    return formattedItems;
  }, [bellyERC721Contract]);

  const fetchMyItems = useCallback(async () => {
    const _response = await bellyERC721Contract.getMyTokens();
    let formattedItems = [];
    formattedItems = await Promise.all(
      _response.map(async (item) => {
        return await fetchURI(item);
      })
    );
    return formattedItems;
  }, [bellyERC721Contract]);

  const connectToWallet = useCallback(async () => {
    if (wallet === "") {
      const web3Modal = new Web3Modal();
      const instance = await web3Modal.connect();
      const prov = new ethers.providers.Web3Provider(instance);
      const signer = prov.getSigner();

      const _wallet = await signer.getAddress();

      console.log(_wallet);

      return {
        provider: prov,
        signer: signer,
        wallet: _wallet,
        web3Modal: web3Modal,
      };
    }
  }, [wallet]);

  useEffect(() => {
    if (wallet === "") {
      connectToWallet().then((res) => {
        dispatch({
          type: actionTypes.SET_WALLET,
          signer: res.signer,
          provider: res.provider,
          wallet: res.wallet,
          web3Modal: res.web3Modal,
        });
      });
    }
    if (wallet !== "") {
      fetchMarketItemsData().then((res) => {
        console.log(res);
        dispatch({
          type: actionTypes.SET_MARKET_ITEMS,
          marketItems: res,
        });
      });

      fetchMyItems().then((res) => {
        console.log(res);
        dispatch({
          type: actionTypes.SET_MY_ITEMS,
          myItems: res,
        });
      });
    }

    return () => {
      return;
    };
  }, [connectToWallet, dispatch, fetchMarketItemsData, fetchMyItems, wallet]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="loot" element={<CratesContainer />} />
          <Route path="profile" element={<ProfileContainer />} />
          <Route path="" element={<MarketContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
