import React from "react";

export default function ItemInfoPage({ detailItem }) {
  return (
    <div className="flex mt-8 flex-col justify-center items-end w-full">
      <div className="font-bold text-xl leading-24 text-white mb-4">
        Latest Chance Bids Completed
      </div>

      <div
        key={Math.random(1, 9999)}
        className="flex jusify-evenly w-fit mt-2 my-4 py-4 px-4 sm:px-4 sm:py-4 bg-color-[#282b39] border border-[#3a3f50] bg-[#282b39] rounded-lg"
      >
        <div>
          <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
            Owner
          </div>
          <div className="mt-4 text-white font-bold leading-14 text-xs tracking-1 uppercase">
            575756
          </div>
        </div>
        <div className="ml-8">
          <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
            BLY Paid
          </div>
          <div className="mt-4 text-white font-bold leading-14 text-xs tracking-1 uppercase">
            75757 BLY
          </div>
        </div>
        <div className="ml-8">
          <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
            Pertentatge
          </div>
          <div className="mt-4 text-white font-bold leading-14 text-xs tracking-1 uppercase">
            dhdhdh
          </div>
        </div>
      </div>
    </div>
  );
}
