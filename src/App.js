import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Header";
import MarketPlaceContainer from "./components/MarketplaceBody";
import { formatEther } from "ethers/lib/utils";
import { actionTypes } from "./context/reducer";
import axios from "axios";
import bigInt from "big-integer";
import { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "./context/ContractProvider";

const fetchURI = async (item) => {
  const tokenURI = item[2];

  let result = [];
  const res = await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, description, image, keyValues, weapons } = res.data;
      let _item = {
        tokenId: item[0],
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
  const [{ bellyERC721Contrat }, dispatch] = useContractsContext();
  const fetchData = useCallback(async () => {
    const _response = await bellyERC721Contrat.getItemsForSale({});
    let formattedItems = [];
    formattedItems = await Promise.all(
      _response.map(async (item) => {
        return await fetchURI(item);
      })
    );
    console.log("KIIU");
    console.log(formattedItems);
    return formattedItems;
  }, [bellyERC721Contrat]);

  useEffect(() => {
    console.log("KE");
    fetchData().then((res) => {
      dispatch({
        type: actionTypes.SET_MARKET_ITEMS,
        marketItems: res,
      });
    });
    return () => {
      return;
    };
  }, [dispatch, fetchData]);
  return (
    <div className="App">
      <Sidebar />
      <Navbar />
      <MarketPlaceContainer />
    </div>
  );
}

export default App;
