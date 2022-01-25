import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useContractsContext } from "../context/ContractProvider";
const items = [
  {
    tokenId: {
      _hex: "0x01",
      _isBigNumber: true,
    },
    itemURI:
      "https://ipfs.io/ipfs/Qme8UiGXWHBnp9GJQUbSHBJsAbHdgPiSeAMT991AoGZH99?filename=Sage",
    image:
      "https://ipfs.io/ipfs/QmUBL6jkZpYXgD6xLuGQe5ZUbFURn947a7RhRTr3Ef6StJ?filename=SageImg",
    name: "Sage",
    price: "20",
    owner: "0x50EA0E9837eE7BD800d74DEdCcf70656C34cc6c2",
  },
  {
    tokenId: {
      _hex: "0x02",
      _isBigNumber: true,
    },
    itemURI:
      "https://ipfs.io/ipfs/Qmf2JyxcqBqn5GXkf16jE2ZJfF8bswejnZFK9K12fJBwD1?filename=Chaman",
    image:
      "https://ipfs.io/ipfs/QmVaAVXZJyyu2J61iih4PFWP6AydsrK81XsTPfL38inaDm?filename=ChamanImg",
    name: "Chaman",
    price: "20",
    owner: "0x50EA0E9837eE7BD800d74DEdCcf70656C34cc6c2",
  },
  {
    tokenId: {
      _hex: "0x04",
      _isBigNumber: true,
    },
    itemURI:
      "https://ipfs.io/ipfs/Qma25SjCDsKWVqD5vw2JygaRrhYMmhVwXkf1w1R8SvzQrx?filename=Rogue",
    image:
      "https://ipfs.io/ipfs/QmXyriQHuYYyyz9A24xwcW7QRThF8H7wEhbpv926y9PuZs?filename=RogueImg",
    name: "Rogue",
    price: "20",
    owner: "0x50EA0E9837eE7BD800d74DEdCcf70656C34cc6c2",
  },
  {
    tokenId: {
      _hex: "0x05",
      _isBigNumber: true,
    },
    itemURI:
      "https://ipfs.io/ipfs/QmfXciPMz9dGmXDjCcZsTyd6r6ZMDHwa1ELx2isSJ6W9qw?filename=Cabalier",
    image:
      "https://ipfs.io/ipfs/QmX7fLTq8ZnDvodF8HpRXVjVxESH2yG782p8xiEo84P2N9?filename=CabalierImg",
    name: "Cabalier",
    price: "20",
    owner: "0x50EA0E9837eE7BD800d74DEdCcf70656C34cc6c2",
  },
  {
    tokenId: {
      _hex: "0x06",
      _isBigNumber: true,
    },
    itemURI:
      "https://ipfs.io/ipfs/QmXrUgst2t4f9iL1kmdBnspZuunZtsxcVxFQs5yLPr4dze?filename=Knight",
    image:
      "https://ipfs.io/ipfs/QmaJPDsTWVUVKQMDtRo94TtqGV45hf1YTZ6xHGnswPbXNi?filename=KnightImg",
    name: "Knight",
    price: "20",
    owner: "0x50EA0E9837eE7BD800d74DEdCcf70656C34cc6c2",
  },
];

export default function MarketItems() {
  const [{ marketItems }, dispatch] = useContractsContext();
  useEffect(() => {
    console.log(marketItems);
  });
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {marketItems.map((item) => {
        return (
          <div key={Math.random(1, 99999999)} style={{ padding: "5px" }}>
            <img
              loading="lazy"
              src={
                item.image !== "" ? item.image : "https://i.gifer.com/V4Jv.gif"
              }
              alt={item.name === "" ? item.name : "NEEN"}
              style={{ width: "128px", height: "128px", objectFit: "contain" }}
            />
            <h1>{item?.name}</h1>
            <h3>{item?.price} BLY</h3>
            <Button variant="contained">BUY</Button>
          </div>
        );
      })}
    </div>
  );
}
