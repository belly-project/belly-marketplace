export const configData = {
  chainInfo: {
    chainId: 80001,
    coinCurrency: "MATIC",
    coinIcon: "cryptocurrency:matic",
    color: "#6a5ea6",
  },

  nftCollection: {
    name: "D Olympus Character",
    contract: {
      name: "DOlympusChatacterERC721",
      address: "",
      abi: "",
    },
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
    nftTypesFilters: false,
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
  },
  pages: [
    {
      name: "Profile",
      icon: "map:storage",
      route: "/profile/inventory",
    },
    {
      name: "Marketplace",
      icon: "map:grocery-or-supermarket",
      route: "/",
    },

    {
      name: "Loot",
      icon: "map:jewelry-store",
      route: "/loot",
    },
    {
      name: "Battle",
      icon: "map:museum",
      route: "/battle",
      disabled: true,
    },
  ],
  orderType: {
    sort: [
      { text: "Lowest Price", id: 1 },
      { text: "Highest Price", id: 2 },
      { text: "More Recent", id: 3 },
      { text: "Older", id: 4 },
    ],
    view: [
      { text: "GRID", icon: "dashicons:grid-view" },
      { text: "LIST", icon: "dashicons:excerpt-view" },
    ],
  },
};
