import { Icon } from "@iconify/react";
import axios from "axios";
import { formatEther, id } from "ethers/lib/utils";

export const basicFetchURI = async (item) => {
  const tokenURI = item[2];
  let result = [];

  await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, desc, _class, keyvalues, weapons, image } = res.data;
      let _item = {
        tokenId: parseInt(item[0].toHexString().toString(16)),
        itemURI: tokenURI,
        image: image,
        name: name,
        _class: _class,
        description: desc,
        weapons: weapons,
        stats: keyvalues,
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
      console.log("EII");
    }
  });
  return result;
};

export const chanceBidFor = async (item, detailItem) => {
  console.log(item, detailItem);
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
      console.log("EII");
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