import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BuyableItemWrapper from "../../components/BuyableItemWrapper";
import { useContractsContext } from "../../context/ContractProvider";
import { basicFetchURI } from "../../context/utils";
import ItemInfoPage from "./components/ItemInfoPage";
import ItemPageActionContainer from "./components/ItemPageActionContainer";
import ItemPagePresentation from "./components/ItemPagePresentation";

export default function ItemPageContainer() {
  const [token, setToken] = useState({});
  const [{ bellyERC721Contract, wallet }] = useContractsContext();
  let location = useLocation();
  let { tokenId } = useParams();
  let navigate = useNavigate();

  const fetchTokenData = useCallback(async () => {
    let _response;

    if (location.pathname.includes("profile/inventory")) {
      _response = await bellyERC721Contract.allBellyCharacters(tokenId);

      if (_response[4] !== wallet) {
        return 0;
      }
    } else {
      _response = await bellyERC721Contract.bellyCharactersForSale(tokenId);
    }

    let formattedItem = [];
    try {
      formattedItem = await basicFetchURI(_response);
    } catch (e) {
      return 0;
    }

    return formattedItem;
  }, [bellyERC721Contract, location.pathname, tokenId, wallet]);

  useEffect(() => {
    if (wallet !== "" && !token.owner) {
      fetchTokenData().then((res) => {
        if (res !== 0) {
          setToken(res);
        } else {
          //navigate("/");
        }
      });
    }
  }, [
    bellyERC721Contract.bellyCharactersForSale,
    fetchTokenData,
    location.pathname,
    navigate,
    token,
    wallet,
  ]);
  return (
    <div className="overflow-auto h-full h-full">
      <div className="mx-auto px-16 md:mt-10 flex justify-center items-center">
        <div className="flex flex-col 2md:flex-row align-top w-full justify-evenly">
          <ItemPagePresentation detailItem={token} />

          <div className="">
            <div className="">
              <div className="font-bold mt-10 text-xl leading-24 text-white mb-4">
                About
              </div>
              <ItemPageActionContainer detailItem={token} />
            </div>
            <ItemInfoPage detailItem={token} />
          </div>
        </div>
      </div>
    </div>
  );
}
