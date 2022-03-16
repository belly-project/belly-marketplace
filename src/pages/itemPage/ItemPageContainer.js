import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTokenInfo } from "../../apollo/queries";
import { useContractsContext } from "../../context/ContractProvider";
import { basicFetchURI, nftToUi } from "../../context/utils";
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
    let res;

    if (location.pathname.includes("profile/inventory")) {
      res = await getTokenInfo(parseInt(tokenId));

      if (res.characters[0].currentOwner.id !== wallet.toLowerCase()) {
        return 0;
      }
    } else {
      res = await getTokenInfo(parseInt(tokenId));
    }

    console.log(res);
    let _response = res.characters[0];
    let owner = res.characters[0].currentOwner.id;
    let formattedItem = [];
    try {
      formattedItem = await basicFetchURI({
        ..._response,
        currentOwner: owner,
      });
    } catch (e) {
      return 0;
    }

    return formattedItem;
  }, [location.pathname, tokenId, wallet]);

  useEffect(() => {
    if (wallet !== "") {
      fetchTokenData().then((res) => {
        if (res !== 0) {
          let formatted = nftToUi(res);
          console.log(formatted);
          setToken(formatted);
        } else {
          navigate("/");
        }
      });
    } else {
    }
  }, []);
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
