import { Icon } from "@iconify/react";
import React from "react";
import ClassFilterItem from "./ClassFilterItem";

export default function Filters() {
  return (
    <div
      className="hidden md:flex  sticky left-0 border-[#3a3f50] border-r "
      style={{ height: "94vh", width: "280px" }}
    >
      <div className="pb-32 w-full">
        <div className="w-full ">
          <div className="flex flex-row pr-2 pl-4 py-4  items-center">
            <h2 className="text-2xl bold">Filters</h2>
          </div>
          <div className="" style={{ boxSizing: "border-box" }}>
            <div className="CollapsePannel_container_classes py-4 pr-2 pl-4 border-t border-#3a3f50">
              <div className="flex items-center justify-between">
                <div className="flex items-center cursor-pointer w-full">
                  <div className="CollapseTrigger_icon__2dF5B CollapseTrigger_isOpen__EdE8Y">
                    <Icon icon="ant-design:caret-down-filled" color="gray" />
                  </div>
                  <div className="ml-3 font-la text-28">Class</div>
                </div>
              </div>
              <div className="flex flex-wrap mt-4">
                <ClassFilterItem
                  classText={"Tank"}
                  icon={"mdi:shield-account"}
                  color={"#4c3ad1"}
                />
                <ClassFilterItem
                  classText={"Mage"}
                  icon={"mdi:auto-fix"}
                  color={"#c584cf"}
                />
                <ClassFilterItem
                  classText={"Rider"}
                  icon={"mdi:horse-variant"}
                  color={"#0039ce"}
                />
                <ClassFilterItem
                  classText={"Shooter"}
                  icon={"mdi:bow-arrow"}
                  color={"#1df2bd"}
                />
                <ClassFilterItem
                  classText={"Killer"}
                  icon={"mdi:knife-military"}
                  color={"red"}
                />
                <ClassFilterItem
                  classText={"Pirate"}
                  icon={"mdi:skull-crossbones"}
                  color={"orange"}
                />
                <ClassFilterItem
                  classText={"Support"}
                  icon={"mdi:bottle-tonic-plus"}
                  color={"green"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
