import React from "react";

export default function InventoryItem({ tokenId, name, price, img }) {
  return (
    <div className="border rounded-lg m-3 border-gray bg-gray rounded transition hover:shadow hover:border-primary-4 cursor-pointer">
      <a href={`/profile/inventory/${tokenId}`}>
        <div className="px-4 py-3">
          <div className="flex flex-col leading-16 items-center justify-between">
            <div className="mt-2 mb-1 flex flex-col">
              <small className=" flex-col truncate ml-2">BLY #{tokenId}</small>
              <div className="flex  flex-col justify-center items-center ">
                <img
                  className="m-2 rounded-lg"
                  src={img}
                  alt="6483566"
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
      </a>
    </div>
  );
}
