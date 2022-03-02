/* eslint-disable no-unused-vars */
import { Icon } from "@iconify/react";
import axios from "axios";
import { formatEther } from "ethers/lib/utils";

export const statsFilters = [];
export const basicFetchURI = async (item) => {
  const tokenURI = item[2];
  let result = [];

  await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, description, keyvalues, weapons, image } = res.data;
      const _class = res.data["class"];
      let _item = {
        tokenId: parseInt(item[0].toHexString().toString(16)),
        itemURI: tokenURI,
        image: image,
        name: name,
        _class: _class,
        description: description,
        weapons: weapons,
        stats: keyvalues,
        price: parseFloat(formatEther(item[6])),
        owner: item[4],
        forSale: formatEther(item[6]) > 0.0 ? true : false,
      };
      result = _item;
    } else {
    }
  });
  return result;
};

export const changeChainToMumbai = async () => {
  let chainID = 80001;
  chainID = "0x" + chainID.toString(16);

  //Comprobar si esta creada MUMBAI

  //SI no ho esta fer wallet_addEthereumChain

  const created = await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: chainID,
        chainName: "Mumbai Matic Testnet",
        nativeCurrency: {
          name: "Mumbai Matic Testnet",
          symbol: "MATIC", // 2-6 characters long
          decimals: 18,
        },
        rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
      },
    ],
  });
  if (created) {
  } else {
  }
};

export const chanceBidFetchURI = async (item) => {
  const tokenURI = item[2];

  let result = [];
  await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, description, weapons, image } = res.data;

      let _item = {
        itemId: item[0].toString(),
        itemURI: tokenURI,
        image: image,
        name: name,
        owner: item[1],
        total: item[3].toString(),
        paidFor: item[4].toString(),
      };
      result = _item;
    } else {
    }
  });
  return result;
};

export const crateFetchURI = async (item) => {
  const tokenURI = item[3];
  let result = [];
  await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, description, weapons, image } = res.data;

      let _item = {
        image: image,
        name: name,
        mintedBy: item[1],
        price: item[2].toString(),
      };
      result = _item;
    } else {
    }
  });
  return result;
};

export const getUIdataForClass = (clss, nftConfig) => {
  const configClass = nftConfig.nftTypes;
  const configObj = configClass.find(
    (cl) => cl.text.toUpperCase() === clss.toUpperCase()
  );

  if (configObj) {
    return {
      icon: <Icon icon={configObj.icon} color={configObj.color} />,
      text: configObj.text.toUpperCase(),
    };
  }

  return {};
};

export const getUIdataForStats = (stats, nftConfig) => {
  const configStats = nftConfig.nftStats;
  let array = [];
  configStats.forEach((cnf) => {
    let name = cnf.name.toLowerCase();

    if (name.toLowerCase() in stats) {
      array.push({
        ...cnf,
        icon: <Icon icon={cnf.icon} color={cnf.color} />,
        value: stats[name.toLowerCase()],
      });
    }
  });
  return array;
};

export const nftToUi = (nftData, nftConfig) => {
  const {
    description,
    forSale,
    image,
    itemURI,
    name,
    owner,
    price,
    stats,
    tokenId,
    weapons,
    _class,
  } = nftData;

  return {
    ...nftData,
    _class: getUIdataForClass(_class, nftConfig),
    stats: getUIdataForStats(stats, nftConfig),
  };
};

export const chanceBidFor = async (item, detailItem) => {
  let _item = {
    owner: item[1],
    total: detailItem.total,
    paidFor: item[0].toString(),
  };

  return _item;
};

export const profileFetchURI = async (item) => {
  const tokenURI = item[2];
  let result = [];
  await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, image } = res.data;
      let _item = {
        tokenId: parseInt(item[0].toHexString().toString(16)),
        itemURI: tokenURI,
        image: image,
        name: name,
        price: formatEther(item[6]),
        owner: item[4],
      };
      result = _item;
    } else {
    }
  });
  return result;
};

export const getClassIcon = (classString) => {
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

export const formatWeapons = (weapons) => {
  let formatted = weapons.map((weapon) => {
    return processWeapon(weapon);
  });
  return formatted;
};

export const processWeapon = (weaponString) => {
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
    case "lances":
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

const compareLower = (a, b) => {
  if (a.price < b.price) {
    return -1;
  }
  if (a.price > b.price) {
    return 1;
  }
  return 0;
};
const compareHigher = (a, b) => {
  if (a.price > b.price) {
    return -1;
  }
  if (a.price < b.price) {
    return 1;
  }
  return 0;
};
const compareHigherId = (a, b) => {
  if (a.tokenId > b.tokenId) {
    return -1;
  }
  if (a.tokenId < b.tokenId) {
    return 1;
  }
  return 0;
};

const compareLowerId = (a, b) => {
  if (a.tokenId < b.tokenId) {
    return -1;
  }
  if (a.tokenId > b.tokenId) {
    return 1;
  }
  return 0;
};

export const orderItems = (value, itemsToOrder, setValue) => {
  if (setValue) {
    setValue(parseInt(value));
  }

  switch (value) {
    case "1":
      return itemsToOrder.sort(compareLower);

    case "2":
      return itemsToOrder.sort(compareHigher);

    case "3":
      return itemsToOrder.sort(compareHigherId);
    case "4":
      return itemsToOrder.sort(compareLowerId);
    default:
      return itemsToOrder;
  }
};

export const filterByStats = (statsFiltersState, itemsToFilter) => {
  //Comprobar quins estan fora dels minims u maxims,
  console.log(statsFiltersState);
  let filteredItems = itemsToFilter;
  if (
    statsFiltersState[0].state.min !== 10 &&
    statsFiltersState[0].state.min !== 300
  ) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.stats.health >= statsFiltersState[0].state.min &&
        item.stats.health <= statsFiltersState[0].state.max
    );
  }

  if (
    statsFiltersState[1].state.min !== 10 &&
    statsFiltersState[1].state.min !== 200
  ) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.stats.speed >= statsFiltersState[1].state.min &&
        item.stats.speed <= statsFiltersState[1].state.max
    );
  }

  if (
    statsFiltersState[2].state.min !== 10 &&
    statsFiltersState[2].state.min !== 200
  ) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.stats.strength >= parseInt(statsFiltersState[2].state.min) &&
        item.stats.strength <= statsFiltersState[2].state.max
    );
  }
  if (
    statsFiltersState[3].state.min !== 0 &&
    statsFiltersState[3].state.min !== 200
  ) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.stats.magic >= statsFiltersState[3].min &&
        item.stats.magic <= statsFiltersState[3].max
    );
  }
  return filteredItems;
};
