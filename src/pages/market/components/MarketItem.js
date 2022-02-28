import React from "react";
import { useContractsContext } from "../../../context/ContractProvider";
import { formatWeapons, getClassIcon } from "../../../context/utils";

export default function MarketItem(props) {
  const { item, type } = props;
  const [{ wallet }] = useContractsContext();
  const { tokenId, owner, weapons, name, price, image, _class } = item;

  const _weapons = formatWeapons(weapons);

  return type === "GRID" ? (
    <div className="m-1 cursor-pointer">
      <a
        href={
          owner === wallet
            ? `/profile/inventory/${tokenId}`
            : `/token/${tokenId}`
        }
      >
        <div className="border rounded-lg m-2 border-gray bg-gray-6 transition rounded hover:shadow hover:border-primary-4 cursor-pointer">
          <div className="px-4 py-3">
            <div className="flex flex-col leading-16 items-center justify-between">
              <div className="mt-2 mb-1 flex flex-col">
                <small className=" flex-col truncate ml-2">
                  BLY #{tokenId}
                </small>
                <div className="flex  flex-col justify-center items-center ">
                  <img
                    className="m-2 rounded-lg"
                    src={image}
                    alt={tokenId}
                    style={{
                      width: "200px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="h-0 pb-12 flex flex-row flex-wrap justify-center overflow-hidden items-baseline">
                  <h5 className="truncate font-medium text-2xl md:text-20 md:leading-24">
                    {name}
                  </h5>
                </div>
                <div className="h-0 pb-12 flex flex-row flex-wrap justify-center overflow-hidden items-baseline">
                  <h5 className="truncate font-medium md:text-20 md:leading-24">
                    Ξ {price}
                  </h5>
                  <h6 className="truncate ml-4 text-gray-1 font-medium">
                    ${price}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  ) : (
    <div className="m-1 cursor-pointer">
      <a
        href={
          owner === wallet
            ? `/profile/inventory/${tokenId}`
            : `/token/${tokenId}`
        }
      >
        <div className="border rounded-lg m-3 border-gray bg-gray-6 rounded transition hover:shadow hover:border-primary-4  cursor-pointer">
          <div className="flex items-center justify-between flex-wrap w-full">
            <div className="w-1/5">
              <div className="w-full">
                <img
                  className="m-4 rounded-lg"
                  src={image}
                  alt={tokenId}
                  style={{
                    width: "128px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <div className="flex  w-1/5 flex-col py-2">
              <div className="inline-flex leading-2 items-center">
                <div>
                  <span
                    className="flex px-4 rounded text-12 py-1  border border-transparent"
                    style={{
                      backgroundColor: "green",
                      borderColor: "transparent",
                    }}
                  >
                    <span className="">#{tokenId}</span>
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-row">
                <small className="text-lg">{name}</small>
              </div>
            </div>
            <div className="w-1/5">
              <div className="flex items-center">
                <div className="flex flex-row items-center mb-2 text-gray-1 w-2/4">
                  {getClassIcon(_class)}
                  <div className="ml-5">{_class}</div>
                </div>
              </div>
            </div>
            <div className="w-1/5 flex-col items-center">
              <div className="flex flex-col mr-10 items-center">
                {_weapons?.map((weapon) => {
                  return (
                    <div
                      key={Math.random(1, 99999)}
                      className="flex items-center mb-2 text-gray-1 w-2/4"
                    >
                      <div style={{ width: "32ox", height: "32px" }}></div>
                      <div className="text-12 font-medium pl-2 break-words text-white leading-2">
                        {weapon}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-1/5 flex flex-col items-center">
              <h4 className="truncate font-medium break-all">Ξ 0.011</h4>
              <h6 className="truncate text-gray-1 font-medium break-all">
                $35
              </h6>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
