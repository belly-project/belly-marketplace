import { Icon } from "@iconify/react";
import axios from "axios";
import { formatEther } from "ethers/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContractsContext } from "../../context/ContractProvider";

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

export default function ItemPageContainer() {
  const [token, setToken] = useState({});
  const [{ bellyERC721Contract, wallet }] = useContractsContext();
  let { tokenId } = useParams();

  const fetchTokenData = useCallback(async () => {
    const _response = await bellyERC721Contract.cryptoCardsForSale(tokenId);
    let formattedItem = [];
    formattedItem = await fetchURI(_response);

    return formattedItem;
  }, [bellyERC721Contract, tokenId]);

  useEffect(() => {
    if (wallet !== "") {
      fetchTokenData().then((res) => {
        setToken(res);
      });
    }
  }, [fetchTokenData, wallet]);
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
                alt={token.name}
                width="480"
                height="480"
              />
            </div>
          </div>
        </div>
        <div className="block md:inline-block md:w-50 align-top">
          <div className="w-full">
            <div className="flex items-center w-full flex-wrap md:justify-end">
              <div className="border-r border-gray-2 py-4 md:hidden">
                <div className="flex items-center text-gray-2 cursor-pointer pr-20">
                  Auction info
                </div>
              </div>
              <div className="ml-24 text-right">
                <h3 className="break-all">Ξ&nbsp;{token.price}</h3>
                <h5 className="mt-4 text-gray-1 break-all">${token.price}</h5>
              </div>
              <div className="ml-0 md:ml-8 mt-7 w-full md:w-auto md:mt-0">
                <div className="inline-block">
                  <button className="px-4 py-4 relative rounded transition  border  border-[#3a3f50] text-gray-2">
                    <div className="flex items-center">
                      <Icon icon="logos:metamask-icon" color="white" />
                      <div className="ml-2">Buy now</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="font-bold text-xl leading-24 text-white mb-4">
              About
            </div>
            <div className="py-4 px-4 sm:px-4 sm:py-4 bg-color-[#282b39] border border-[#3a3f50] bg-[#282b39] rounded-lg">
              <div className="flex items-start justify-start">
                <div className="mr-4" style={{ width: "100px" }}>
                  <div className="text-gray-1 font-bold leading-14 text-10 tracking-1 uppercase">
                    Class
                  </div>
                  <div className="flex items-center mt-4">
                    <Icon />

                    <div className="ml-4 capitalize">Shooter</div>
                  </div>
                </div>
                <div style={{ width: "100px" }}>
                  <div className="text-gray-1 font-bold leading-14 text-10 tracking-1 uppercase">
                    Skill Level
                  </div>
                  <div className="mt-4 text-16 leading-20 flex items-center">
                    <span>2 / 7</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="text-gray-1 font-bold leading-14 text-xs tracking-1 uppercase">
                  Owner
                </div>
                <a href="/profile/ronin:afa8f8e86ea206a20626153eb21a96de628e10e9/axie/">
                  <div className="mt-2 text-lg leading-20 truncate flex items-center cursor-pointer">
                    <h5 className="mr-2 hover:text-primary-3 font-semibold truncate">
                      Luna #4
                    </h5>
                    <small className="text-gray-2 truncate">
                      (ronin:afa8f8e86ea206a20626153eb21a96de628e10e9)
                    </small>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="font-bold text-xl leading-24 text-white mb-2">
              Stats
            </div>
            <div
              className="
            flex flex-row
            justify-between
            py-2 px-2 pb-0
            sm:pt-4 sm:pb-4 sm:px-4
            rounded-lg bg-[#282b39] border border-[#3a3f50]"
            >
              <div className="w-1/2 sm:w-auto mb-4">
                <div className="text-10 leading-14 font-bold tracking-1 mb-2 uppercase text-gray-1">
                  Health
                </div>
                <div className="flex items-center">
                  <Icon icon="ant-design:heart-filled" color="green" />
                  <div className="ml-2 text-xl leading-24">47</div>
                </div>
              </div>
              <div className="w-1/2 sm:w-auto mb-2">
                <div className="text-10 leading-14 font-bold tracking-1 mb-2 uppercase text-gray-1">
                  Speed
                </div>
                <div className="flex items-center">
                  <Icon icon="bi:lightning-charge-fill" color="yellow" />
                  <div className="ml-2 text-xl leading-24">52</div>
                </div>
              </div>
              <div className="w-1/2 sm:w-auto mb-2">
                <div className="text-10 leading-14 font-bold tracking-1 mb-2 uppercase text-gray-1">
                  Skill
                </div>
                <div className="flex items-center">
                  <Icon icon="icon-park-outline:muscle" color="red" />
                  <div className="ml-2 text-xl leading-24">35</div>
                </div>
              </div>
              <div className="w-1/2 sm:w-auto mb-2">
                <div className="text-10 leading-14 font-bold tracking-1 mb-2 uppercase text-gray-1">
                  Magic
                </div>
                <div className="flex items-center">
                  <Icon icon="ant-design:star-filled" color="purple" />
                  <div className="ml-2 text-xl leading-24">30</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="font-bold text-xl leading-24 text-white mb-2">
              Weapons
            </div>
            <div
              className="
            flex flex-row
            justify-between
            py-2 px-2 pb-0
            sm:pt-4 sm:pb-4 sm:px-4
            rounded-lg bg-[#282b39] border border-[#3a3f50]"
            >
              <div className="w-1/2 sm:w-auto mb-4">
                <div className="text-10 leading-14 font-bold tracking-1 mb-2 uppercase text-gray-1">
                  Health
                </div>
                <div className="flex items-center">
                  <Icon icon="ant-design:heart-filled" color="green" />
                  <div className="ml-2 text-xl leading-24">47</div>
                </div>
              </div>
              <div className="w-1/2 sm:w-auto mb-2">
                <div className="text-10 leading-14 font-bold tracking-1 mb-2 uppercase text-gray-1">
                  Speed
                </div>
                <div className="flex items-center">
                  <Icon icon="bi:lightning-charge-fill" color="yellow" />
                  <div className="ml-2 text-xl leading-24">52</div>
                </div>
              </div>
              <div className="w-1/2 sm:w-auto mb-2">
                <div className="text-10 leading-14 font-bold tracking-1 mb-2 uppercase text-gray-1">
                  Skill
                </div>
                <div className="flex items-center">
                  <Icon icon="icon-park-outline:muscle" color="red" />
                  <div className="ml-2 text-xl leading-24">35</div>
                </div>
              </div>
              <div className="w-1/2 sm:w-auto mb-2">
                <div className="text-10 leading-14 font-bold tracking-1 mb-2 uppercase text-gray-1">
                  Magic
                </div>
                <div className="flex items-center">
                  <Icon icon="ant-design:star-filled" color="purple" />
                  <div className="ml-2 text-xl leading-24">30</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
