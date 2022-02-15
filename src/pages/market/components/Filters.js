import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useContractsContext } from "../../../context/ContractProvider.js";
import { actionTypes } from "../../../context/reducer.js";
import ClassFilterItem from "./ClassFilterItem.js";

const statsFilter = [
  { name: "Health", icon: "ant-design:heart-filled", color: "green" },
  { name: "Speed", icon: "bi:lightning-charge-fill", color: "yellow" },
  { name: "Skill", icon: "icon-park-outline:muscle", color: "red" },
  { name: "Magic", icon: "ant-design:star-filled", color: "purple" },
];

const classFilters = [
  {
    classText: "Tank",
    icon: "mdi:shield-account",
    color: "#9908A3",
  },
  {
    classText: "Mage",
    icon: "mdi:auto-fix",
    color: "#c584cf",
  },
  {
    classText: "Rider",
    icon: "mdi:horse-variant",
    color: "#2575cf",
  },
  {
    classText: "Shooter",
    icon: "mdi:bow-arrow",
    color: "#1df2bd",
  },
  {
    classText: "Pirate",
    icon: "mdi:skull-crossbones",
    color: "#e87021",
  },
  {
    classText: "Support",
    icon: "mdi:bottle-tonic-plus",
    color: "#208a19",
  },
  {
    classText: "Killer",
    icon: "mdi:knife-military",
    color: "#ad0c1f",
  },
];

export default function Filters() {
  const [classSelected, setClassSelected] = useState("");
  const [healthFilter, setHealthFilter] = useState({
    min: 10,
    max: 300,
  });
  const [speedFilter, setSpeedFilter] = useState({
    min: 10,
    max: 200,
  });
  const [skillFilter, setSkillFilter] = useState({
    min: 10,
    max: 200,
  });
  const [magicFilter, setMagicFilter] = useState({
    min: 0,
    max: 200,
  });
  const [{ marketItems }, dispatch] = useContractsContext();
  const filterByClass = (_class) => {
    let filteredItems = marketItems;
    //Filtrar por clase
    if (_class === classSelected) {
      setClassSelected("");
    } else {
      filteredItems = marketItems.filter(
        (item) => item.class === _class.toUpperCase()
      );
      setClassSelected(_class);
    }
    dispatch({
      type: actionTypes.SET_MARKET_ITEMS_FILTERED,
      marketItems: filteredItems,
    });
  };

  const handleChange = (type, value) => {
    if (type === "max") {
      if (value <= 200) {
        setMagicFilter({ ...magicFilter, max: value });
      } else {
        setMagicFilter({ ...magicFilter, max: 200 });
      }
    } else {
      if (value >= 199) {
        setMagicFilter({ ...magicFilter, min: 199 });
      } else {
        setMagicFilter({ ...magicFilter, min: value });
      }
    }
  };

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
                {classFilters.map((item) => {
                  return (
                    <ClassFilterItem
                      selected={item.classText === classSelected}
                      key={item.classText}
                      classText={item.classText}
                      icon={item.icon}
                      color={item.color}
                      onClick={() => filterByClass(item.classText)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="" style={{ boxSizing: "border-box" }}>
            <div className="CollapsePannel_container_classes py-4 pr-2 pl-4 border-t border-[#3a3f50]">
              <div className="flex items-center justify-between">
                <div className="flex items-center cursor-pointer w-full">
                  <div className="CollapseTrigger_icon__2dF5B CollapseTrigger_isOpen__EdE8Y">
                    <Icon icon="ant-design:caret-down-filled" color="gray" />
                  </div>
                  <div className="ml-3 font-la text-28">Stats</div>
                </div>
              </div>
              <div
                className="CollapseContent_container__2FLT6 CollapseContent_isOpen__3LOKg"
                style={{}}
              >
                <div className="px-2 mt-2 sm:px-0">
                  {statsFilter?.map((filterItem) => {
                    return (
                      <div key={filterItem.name}>
                        <div className="flex justify-between mt-4">
                          <div className="flex items-center">
                            <Icon
                              icon={filterItem.icon}
                              color={filterItem.color}
                            />
                            <div className="text-xs text-gray-1 uppercase ml-4 font-bold tracking-1">
                              {filterItem.name}
                            </div>
                          </div>
                        </div>
                        <div
                          className="mt-4"
                          style={{ width: "calc(100% - 16px)" }}
                        >
                          <div className="InputRangeTextBox_container__3pMgJ pb-4 InputRangeTextBox_hasTextbox__yJ__-">
                            <div className="flex justify-between items-center relative StatFilter_containerInputs__LdeKA">
                              <div className="InputRangeTextBox_input__2rEFp">
                                <div className="input-group inline-block rounded relative w-full">
                                  <input
                                    size="20"
                                    required=""
                                    type="number"
                                    className="p-1 mx-1 w-28 border transition text-14 input-field border-[#3a3f50] focus:border-[#046cfc] bg-[#11131b] text-white placeholder-[#6b7185]"
                                    value={magicFilter.min}
                                    onChange={(e) =>
                                      handleChange("min", e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <span className="InputRangeTextBox_divide__33-W0">
                                -
                              </span>
                              <div className="InputRangeTextBox_input__2rEFp">
                                <div className="input-group inline-block rounded relative w-full">
                                  <input
                                    size="20"
                                    type="number"
                                    className="p-1 mx-2 w-28 border transition text-14 input-field border-[#3a3f50] focus:border-[#046cfc] bg-[#11131b] text-white placeholder-[#6b7185]"
                                    value={magicFilter.max}
                                    onChange={(e) =>
                                      handleChange("max", e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
