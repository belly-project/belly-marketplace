import axios from "axios";
import { formatEther } from "ethers/lib/utils";
import React, { useCallback, useEffect } from "react";
import { useContractsContext } from "../../context/ContractProvider";
import { actionTypes } from "../../context/reducer";
import Filters from "./components/Filters";
import MarketBodyOptions from "./components/MarketBodyOptions";
import MarketItem from "./components/MarketItem";

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

export default function MarketContainer() {
  const [{ marketItems, bellyERC721Contract, wallet }, dispatch] =
    useContractsContext();

  const fetchMarketItemsData = useCallback(async () => {
    console.log(bellyERC721Contract);
    const _response = await bellyERC721Contract.getItemsForSale({});
    let formattedItems = [];
    formattedItems = await Promise.all(
      _response.map(async (item) => {
        return await fetchURI(item);
      })
    );
    return formattedItems;
  }, [bellyERC721Contract]);

  useEffect(() => {
    if (wallet !== "") {
      console.log("KE");
      fetchMarketItemsData().then((res) => {
        dispatch({
          type: actionTypes.SET_MARKET_ITEMS,
          marketItems: res,
        });
      });
    }

    return () => {};
  }, [
    bellyERC721Contract.getItemsForSale,
    dispatch,
    fetchMarketItemsData,
    wallet,
  ]);

  return (
    <div className="flex flex-row">
      <Filters />
      <div className="flex flex-col w-full mt-4">
        <div
          className="overflow-x-auto flex-1 px-8 py-4 md:px-32 md:py-0"
          style={{ maxHeight: "100vh" }}
        >
          <div className="w-full h-full relative">
            <div className="w-full h-full relative">
              <MarketBodyOptions />

              <div className="flex mt-8 flex-wrap justify-center w-full">
                {marketItems.map((item) => {
                  return (
                    <MarketItem
                      key={item.tokenId}
                      tokenId={item.tokenId}
                      name={item.name}
                      price={item.price}
                      img={item.image}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
