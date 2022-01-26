import { Icon } from "@iconify/react";
import React from "react";

export default function MarketBodyOptions() {
  return (
    <div className="relative flex flex-wrap justify-between flex-col-reverse xl:flex-row">
      <div className="flex justify- items-center xl:justify-center">
        <div className="flex items-center w-full justify-between xl:w-auto">
          <div className="mr-4">
            <div className="text-left" style={{ width: "158px" }}>
              <button className="px-2 py-2 relative rounded transition focus:outline-none border w-full text-white border-gray-2 hover:border-gray-1 active:border-[#3a3f50] bg-gray-5 hover:bg-gray-4 active:bg-gray-6">
                <span className="visible">
                  <div className="flex items-center text-left justify-between">
                    <Icon icon="fe:search" color="white" />
                  </div>
                </span>
              </button>
            </div>
          </div>
          <div>
            <div className="text-left" style={{ width: "158px" }}>
              <button className="px-2 py-2 relative rounded transition focus:outline-none border w-full text-white border-gray-2 hover:border-gray-1 active:border-[#3a3f50] bg-gray-5 hover:bg-gray-4 active:bg-gray-6">
                <span className="visible">
                  <div className="flex items-center text-left justify-between">
                    <div>Lowest Price</div>
                    <Icon icon="ant-design:down-outlined" color="white" />
                  </div>
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-centerbtn-groups">
            <div className="ml-8 relative hidden md:hidden">
              <div className="flex">
                <button className="px-20 py-8 relative rounded transition focus:outline-none border text-white border-gray-2 hover:border-gray-1 active:border-[#3a3f50] bg-gray-5 hover:bg-gray-4 active:bg-gray-6">
                  <span className="visible">
                    <div className="flex items-center">
                      <div
                        className="ml-8 truncate"
                        style={{ maxWidth: "36px" }}
                      >
                        Filter{" "}
                      </div>
                    </div>
                  </span>
                </button>
              </div>
            </div>
            <div>
              <div className="flex cursor-pointer ml-8">
                <div className="control-group inline-flex flex-row horizontal">
                  <div
                    className="border hover:border-gray-1 active:border-[#3a3f50] hover:bg-gray-4 active:bg-gray-6 border-gray-2 rounded-l p-3 flex items-center justify-center border border-primary-4"
                    style={{ background: "blue" }}
                  >
                    <Icon icon="dashicons:excerpt-view" color="white" />
                  </div>
                  <div className="border hover:border-gray-1 active:border-[#3a3f50] hover:bg-gray-4 active:bg-gray-6 border-gray-2 rounded-r p-3 flex items-center justify-center">
                    <Icon icon="dashicons:grid-view" color="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
