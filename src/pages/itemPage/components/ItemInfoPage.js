import { Icon } from "@iconify/react";
import React from "react";
import { getClassIcon, processWeapon } from "../../../context/utils";

export default function ItemInfoPage({ detailItem }) {
  return (
    <div className="flex mt-8 flex-col justify-center items-end w-full">
      <div className="mt-10">
        <div className="font-bold text-xl leading-24 text-white mb-4">
          About
        </div>
        <div className="py-4 px-4 sm:px-4 sm:py-4 bg-color-[#282b39] border border-[#3a3f50] bg-[#282b39] rounded-lg">
          <div className="flex items-start justify-start"></div>
          <div className="">
            <div className="text-[#a1a6b6] font-bold leading-14 text-lg tracking-1 uppercase">
              {detailItem.name}
            </div>
          </div>
          <div className="mt-4">
            <div className="text-[#a1a6b6] font-bold leading-14 text-xs tracking-1 uppercase">
              Owner
            </div>
            <a href="https://mumbai.polygonscan.com/address/0xF4aB07FD449f2466975385c04a12Ae6f1c25a311">
              <div className="mt-2 text-lg leading-20 truncate flex items-center cursor-pointer">
                ({detailItem.owner})
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
                {detailItem.description}
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
                {getClassIcon(detailItem._class)}
                <div className="ml-2">{detailItem._class}</div>
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
                {detailItem.stats?.health}
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
                {detailItem.stats?.speed}
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
                {detailItem.stats?.strength}
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
                {detailItem.stats?.magic}
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
            {detailItem.weapons?.map((weapon) => {
              return processWeapon(weapon);
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
