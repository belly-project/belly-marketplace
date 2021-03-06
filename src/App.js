import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Header";
import MarketPlaceContainer from "./components/MarketplaceBody";
import { formatEther } from "ethers/lib/utils";
import { actionTypes } from "./context/reducer";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "./context/ContractProvider";
import Web3Modal from "web3modal";
import MyItemsContainer from "./components/MyItemsContainer";
import { Stack } from "@mui/material";
import { ethers } from "ethers";

const fetchURI = async (item) => {
  const tokenURI = item[2];
  let result = [];
  await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, description, image, keyValues, weapons } = res.data;
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

      return { provider: prov, signer: signer, wallet: _wallet };
    }
  }, [bellyERC721Contract]);

  useEffect(() => {
    if (wallet === "") {
      connectToWallet().then((res) => {
        dispatch({
          type: actionTypes.SET_WALLET,
          signer: res.signer,
          provider: res.provider,
          wallet: res.wallet,
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
  }, [wallet]);

  return (
    <div className="App">
      <Stack spacing={1} direction={"row"}>
        <Sidebar />

        <Stack spacing={2} direction={"column"}>
          <Navbar />
          <MarketPlaceContainer />
          <MyItemsContainer />
        </Stack>
      </Stack>
    </div>
  );
}

export default App;
