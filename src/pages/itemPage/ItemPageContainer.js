import { Icon } from "@iconify/react";
import axios from "axios";
import { formatEther, parseEther } from "ethers/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContractsContext } from "../../context/ContractProvider";

const fetchURI = async (item) => {
  const tokenURI = item[2];
  let result = [];
  await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, description, weapons, image } = res.data;

      let _item = {
        tokenId: parseInt(item[0].toHexString().toString(16)),
        itemURI: tokenURI,
        image: image.split("?")[0],
        name: name,
        _class: res.data.class,
        description: description,
        weapons: weapons,
        stats: res.data.keyvalues,
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

const processWeapon = (weaponString) => {
  console.log(weaponString);
  switch (weaponString) {
    case "bows":
      return (
        <div className="flex items-center p-2" key={weaponString}>
          <Icon style={{ fontSize: "36px" }} icon="whh:bow" color="white" />
          <div className="ml-2">Bows</div>
        </div>
      );
    case "knifes":
      return (
        <div className="flex items-center p-2" key={weaponString}>
          <Icon style={{ fontSize: "36px" }} icon="mdi:knife" color="white" />
          <div className="ml-2">Knifes</div>
        </div>
      );
    case "swords":
      return (
        <div className="flex items-center p-2" key={weaponString}>
          <Icon
            style={{ fontSize: "36px" }}
            icon="akar-icons:sword"
            color="white"
          />
          <div className="ml-2">Swords</div>
        </div>
      );
    case "axes":
      return (
        <div className="flex items-center p-2" key={weaponString}>
          <Icon style={{ fontSize: "36px" }} icon="lucide:axe" color="white" />
          <div className="ml-2">Axes</div>
        </div>
      );
    case "lance":
      return (
        <div className="flex items-center p-2" key={weaponString}>
          <Icon style={{ fontSize: "36px" }} icon="mdi:spear" color="white" />
          <div className="ml-2">Lance</div>
        </div>
      );
    case "dark magic":
      return (
        <div className="flex items-center p-2" key={weaponString}>
          <Icon
            style={{ fontSize: "36px" }}
            icon="healthicons:death"
            color="white"
          />
          <div className="ml-2">Dark Magic</div>
        </div>
      );
    case "wand":
      return (
        <div className="flex items-center p-2" key={weaponString}>
          <Icon
            style={{ fontSize: "36px" }}
            icon="mdi:magic-staff"
            color="white"
          />
          <div className="ml-2">Wand</div>
        </div>
      );
    case "holy magic":
      return (
        <div className="flex items-center p-2" key={weaponString}>
          <Icon icon="carbon:worship-christian" color="white" />
          <div className="ml-2">Holy Magic</div>
        </div>
      );
    default:
      return <div></div>;
  }
};

const getClassIcon = (classString) => {
  switch (classString) {
    case "KILLER":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          icon={"mdi:knife-military"}
          color={"white"}
        />
      );
    case "SHOOTER":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          className="text-xl"
          icon={"mdi:bow-arrow"}
          color={"white"}
        />
      );
    case "TANK":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          className="text-xl"
          icon={"mdi:shield-account"}
          color={"white"}
        />
      );
    case "SUPPORT":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          className="text-xl"
          icon={"mdi:bottle-tonic-plus"}
          color={"white"}
        />
      );
    case "PIRATE":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          className="text-xl"
          icon={"mdi:skull-crossbones"}
          color={"white"}
        />
      );
    case "RIDER":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          className="text-xl"
          icon={"mdi:horse-variant"}
          color={"white"}
        />
      );
    case "MAGE":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          className="text-xl"
          icon={"mdi:auto-fix"}
          color={"white"}
        />
      );
    default:
      return;
  }
};

export default function ItemPageContainer() {
  const [token, setToken] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const [{ bellyERC721Contract, bellyERC20Contract, wallet }] =
    useContractsContext();
  let location = useLocation();
  let { tokenId } = useParams();
  let navigate = useNavigate();

  const fetchTokenData = useCallback(async () => {
    let _response;
    if (location.pathname.includes("profile/inventory")) {
      _response = await bellyERC721Contract.allCryptoCards(tokenId);
      if (_response[4] !== wallet) {
        return 0;
      }
      setIsOwner(true);
    } else {
      _response = await bellyERC721Contract.cryptoCardsForSale(tokenId);
    }

    let formattedItem = [];
    formattedItem = await fetchURI(_response);

    return formattedItem;
  }, [bellyERC721Contract, location.pathname, tokenId, wallet]);

  const buyToken = async () => {
    const _approveTransaction = await bellyERC20Contract.approve(
      bellyERC721Contract.address,
      parseEther("20")
    );

    let tx = await _approveTransaction.wait();

    console.log(tx);

    const _buyTokenTransaction = await bellyERC721Contract.buyToken(
      wallet,
      bellyERC20Contract.address,
      token.tokenId,
      parseEther("20")
    );

    tx = await _buyTokenTransaction.wait();

    console.log(tx);
    navigate("/profile/inventory");
  };

  const putItemforSale = async () => {
    const transcation = await bellyERC721Contract.toggleForSale(token.tokenId);

    const tx = await transcation.wait();

    console.log(tx);

    navigate("/profile/inventory");
  };

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
  }, [fetchTokenData, location.pathname, navigate, token, wallet]);
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
        <div className="block max-w-md md:inline-block md:w-50 align-top">
          <div className="w-full">
            <div className="flex items-center w-full flex-wrap md:justify-end">
              <div className="border-r border-gray-2 py-4 md:hidden">
                <div className="flex items-center text-gray-2 cursor-pointer pr-20">
                  Auction info
                </div>
              </div>
              {!isOwner ? (
                <div className="ml-24 text-right">
                  <h3 className="break-all">Ξ&nbsp;{token.price}</h3>
                  <h5 className="mt-4 text-[#a1a6b6] break-all">
                    ${token.price}
                  </h5>
                </div>
              ) : (
                <div className="ml-24 text-right">
                  <h3 className="break-all">You're the owner</h3>
                </div>
              )}
              <div className="ml-0 md:ml-8 mt-7 w-full md:w-auto md:mt-0">
                <div className="inline-block">
                  <button
                    onClick={() => (isOwner ? putItemforSale() : buyToken())}
                    className="px-4 py-4 relative rounded transition  border  border-[#3a3f50] text-gray-2"
                  >
                    <div className="flex items-center">
                      <Icon icon="logos:metamask-icon" color="white" />
                      <div className="ml-2">
                        {isOwner ? "Sell token" : "Buy Token"}
                      </div>
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
              <div className="flex items-start justify-start"></div>
              <div className="">
                <div className="text-[#a1a6b6] font-bold leading-14 text-lg tracking-1 uppercase">
                  {token.name}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
                  Owner
                </div>
                <a href="https://mumbai.polygonscan.com/address/0xF4aB07FD449f2466975385c04a12Ae6f1c25a311">
                  <div className="mt-2 text-lg leading-20 truncate flex items-center cursor-pointer">
                    ({token.owner})
                    <small className="text-gray-2 truncate"></small>
                  </div>
                </a>
              </div>
              <div className="mt-6">
                <div className="text-[#a1a6b6] w-75 font-bold leading-14 text-xs tracking-1 uppercase">
                  Description
                </div>
                <a href="https://mumbai.polygonscan.com/address/0xF4aB07FD449f2466975385c04a12Ae6f1c25a311">
                  <div className="mt-2 text-lg leading-20 truncate flex items-center cursor-pointer">
                    {token.description}
                    <small className="text-gray-2 truncate"></small>
                  </div>
                </a>
              </div>
              <div className="mt-6">
                <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
                  Class
                </div>
                <a href="https://mumbai.polygonscan.com/address/0xF4aB07FD449f2466975385c04a12Ae6f1c25a311">
                  <div className="mt-2 text-lg leading-20 truncate flex items-center cursor-pointer">
                    {getClassIcon(token._class)}
                    <div className="ml-2">{token._class}</div>
                    <small className="text-gray-2 truncate"></small>
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
                <div className="text-10 leading-14 font-bold tracking-1 mb-2 uppercase text-[#a1a6b6]">
                  Health
                </div>
                <div className="flex items-center">
                  <Icon icon="ant-design:heart-filled" color="green" />
                  <div className="ml-2 text-xl leading-24">
                    {token.stats?.health}
                  </div>
                </div>
              </div>
              <div className="w-1/2 sm:w-auto mb-2">
                <div className="text-10 leading-14 font-bold tracking-1 mb-2 uppercase text-[#a1a6b6]">
                  Speed
                </div>
                <div className="flex items-center">
                  <Icon icon="bi:lightning-charge-fill" color="yellow" />
                  <div className="ml-2 text-xl leading-24">
                    {token.stats?.speed}
                  </div>
                </div>
              </div>
              <div className="w-1/2 sm:w-auto mb-2">
                <div className="text-10 leading-14 font-bold tracking-1 mb-2 uppercase text-[#a1a6b6]">
                  Skill
                </div>
                <div className="flex items-center">
                  <Icon icon="icon-park-outline:muscle" color="red" />
                  <div className="ml-2 text-xl leading-24">
                    {token.stats?.strength}
                  </div>
                </div>
              </div>
              <div className="w-1/2 sm:w-auto mb-2">
                <div className="text-10 leading-14 font-bold tracking-1 mb-2 uppercase text-[#a1a6b6]">
                  Magic
                </div>
                <div className="flex items-center">
                  <Icon icon="ant-design:star-filled" color="purple" />
                  <div className="ml-2 text-xl leading-24">
                    {token.stats?.magic}
                  </div>
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
                {token.weapons?.map((weapon) => {
                  return processWeapon(weapon);
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
