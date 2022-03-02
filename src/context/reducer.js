import { ethers } from "ethers";
import {
  bellyChanceBidAbi,
  bellyDropsAbi,
  bellyErc20Abi,
  bellyERC721Abi,
} from "./contracts/abis";

import {
  bellyChanceBid,
  bellyErc20,
  bellyErc721,
  bellyLoot,
} from "./contracts/addresses";

const initialData = {
  chainInfo: {
    chainId: 80001,
  },
  contracts: [
    {
      name: "DOlympusChatacterERC721",
      address: "",
      abi: "",
    },
  ],
  nftStats: [
    {
      name: "Health",
      icon: "ant-design:heart-filled",
      color: "green",
    },
    {
      name: "Speed",
      icon: "bi:lightning-charge-fill",
      color: "yellow",
    },
    {
      name: "Strength",
      icon: "icon-park-outline:muscle",
      color: "red",
    },
    {
      name: "Magic",
      icon: "ant-design:star-filled",
      color: "purple",
    },
  ],
  nftTypes: [
    {
      text: "Tank",
      icon: "mdi:shield-account",
      color: "#9908A3",
    },
    {
      text: "Mage",
      icon: "mdi:auto-fix",
      color: "#FFEE00",
    },
    {
      text: "Rider",
      icon: "mdi:horse-variant",
      color: "#2575cf",
    },
    {
      text: "Shooter",
      icon: "mdi:bow-arrow",
      color: "#1df2bd",
    },
    {
      text: "Pirate",
      icon: "mdi:skull-crossbones",
      color: "#e87021",
    },
    {
      text: "Support",
      icon: "mdi:bottle-tonic-plus",
      color: "#208a19",
    },
    {
      text: "Killer",
      icon: "mdi:knife-military",
      color: "#ad0c1f",
    },
  ],
  orderType: ["Highest Price", "Lowest Price", "More Recent", "Older"],
};

export const initialState = {
  marketData: initialData,
  provider: {},
  bellyERC721Contract: {},
  bellyERC20Contract: {},
  bellyDropsContract: {},
  bellyChanceBidContract: {},
  signer: {},
  web3Modal: {},
  myItems: [],
  marketItems: [],
  marketItemsFiltered: [],
  wallet: "",
  balance: 0,
  correctChain: true,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_MARKET_ITEMS: "SET_MARKET_ITEMS",
  SET_MARKET_ITEMS_FILTERED: "SET_MARKET_ITEMS_FILTERED",
  SET_WALLET: "SET_WALLET",
  SET_BALANCE: "SET_BALANCE",
  SET_MY_ITEMS: "SET_MY_ITEMS",
};

const getContract = (type, signer) => {
  switch (type) {
    case "ERC20":
      return new ethers.Contract(bellyErc20, bellyErc20Abi, signer);
    case "ERC721":
      return new ethers.Contract(bellyErc721, bellyERC721Abi, signer);
    case "LOOT":
      let contract = new ethers.Contract(bellyLoot, bellyDropsAbi, signer);
      return contract;
    case "CHANCE_BID":
      let changeBid = new ethers.Contract(
        bellyChanceBid,
        bellyChanceBidAbi,
        signer
      );
      return changeBid;
    default:
      break;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        authorized: true,
      };
    case actionTypes.SET_MARKET_ITEMS:
      return {
        ...state,
        marketItems: action.marketItems,
        marketItemsFiltered: action.marketItems,
      };
    case actionTypes.SET_MARKET_ITEMS_FILTERED:
      return {
        ...state,
        marketItemsFiltered: action.marketItems,
      };
    case actionTypes.SET_MY_ITEMS:
      return {
        ...state,
        myItems: action.myItems,
        balance: action.balance,
      };
    case actionTypes.SET_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };
    case actionTypes.SET_WALLET:
      return {
        ...state,
        bellyERC721Contract: getContract("ERC721", action.signer),
        bellyERC20Contract: getContract("ERC20", action.signer),
        bellyDropsContract: getContract("LOOT", action.signer),
        bellyChanceBidContract: getContract("CHANCE_BID", action.signer),
        signer: action.signer,
        wallet: action.wallet,
        provider: action.provider,
        web3Modal: action.web3Modal,
        correctChain: action.correctChain,
      };
    default:
      return state;
  }
};

export default reducer;
