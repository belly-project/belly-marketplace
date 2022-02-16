import { Icon } from "@iconify/react";
import { parseEther } from "ethers/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BuyableItemWrapper from "../../components/BuyableItemWrapper";
import { useContractsContext } from "../../context/ContractProvider";
import { basicFetchURI } from "../../context/utils";
import ItemInfoPage from "./components/ItemInfoPage";
import ItemPageActionContainer from "./components/ItemPageActionContainer";

export default function ItemPageContainer() {
  const [token, setToken] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [{ bellyERC721Contract, bellyERC20Contract, wallet }] =
    useContractsContext();
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
    formattedItem = await basicFetchURI(_response);

    return formattedItem;
  }, [bellyERC721Contract, location.pathname, tokenId, wallet]);

  useEffect(() => {
    if (wallet !== "" && !token.owner) {
      fetchTokenData().then((res) => {
        if (res !== 0) {
          setToken(res);
        } else {
          navigate("/");
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
    <div className="mt-20 pb-20 sm:pb-32">
      <div className="mx-auto px-16 flex justify-center">
        <div
          className="block md:sticky md:inline-block md:w-1/2 align-top"
          style={{ top: "120px" }}
        >
          <div
            role="button"
            className="inline-flex items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <Icon icon="bx:bx-arrow-back" color="white" />
          </div>
          <br />
          <div className="mt-8 leading-16 inline-flex item-center">
            <span className="flex px-8 rounded text-12  border border-transparent pt-1 pt-2, bg-[#3a3f50] border-transparent">
              #000000{token.tokenId}
            </span>
          </div>
          <div className="text-28 flex items-end"></div>
          <div className="w-full my-auto">
            <div
              className="relative pointer-events-none"
              style={{ width: "480px", height: "480px", marginLeft: "30px" }}
            >
              <img
                className="mt-5"
                src={token.image}
                alt={token.tokenId}
                width="480"
                height="480"
              />
            </div>
          </div>
        </div>
        {token.owner && (
          <BuyableItemWrapper>
            <ItemPageActionContainer detailItem={token} />
            <ItemInfoPage detailItem={token} />
          </BuyableItemWrapper>
        )}
      </div>
    </div>
  );
}
