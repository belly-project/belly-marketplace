import { Icon } from "@iconify/react";
import React from "react";

export default function RangeGroupFilter({
  filterList,
  state,
  setState,
  FilterComponent,
}) {
  const handleChange = (type, value, item) => {
    if (type === "max") {
      if (value <= 200) {
        item.setState({ ...item.state, max: value });
      } else {
        item.setState({ ...item.state, max: 200 });
      }
    } else {
      if (value >= 199) {
        item.setState({ ...item.state, min: 199 });
      } else {
        item.setState({ ...item.state, min: value });
      }
    }
  };

  return filterList?.map((filterItem) => {
    return (
      <div key={Math.random(1, 999)}>
        <div className="flex justify-between mt-4">
          <div className="flex items-center">
            <Icon icon={filterItem.info.icon} color={filterItem.info.color} />
            <div className="text-xs text-gray-1 uppercase ml-4 font-bold tracking-1">
              {filterItem.info.name}
            </div>
          </div>
        </div>
        <div className="mt-4" style={{ width: "calc(100% - 16px)" }}>
          <div className="InputRangeTextBox_container__3pMgJ pb-4 InputRangeTextBox_hasTextbox__yJ__-">
            <div className="flex justify-between items-center relative StatFilter_containerInputs__LdeKA">
              <div className="InputRangeTextBox_input__2rEFp">
                <div className="input-group inline-block rounded relative w-full">
                  <input
                    size="20"
                    required=""
                    type="number"
                    className="p-1 mx-1 w-28 border transition text-14 input-field border-primary-3 focus:border-primary-4 bg-gray-6 text-white placeholder-gray-2"
                    value={filterItem.state.min}
                    onChange={(e) =>
                      handleChange("min", e.target.value, filterItem)
                    }
                  />
                </div>
              </div>
              <span className="InputRangeTextBox_divide__33-W0">-</span>
              <div className="InputRangeTextBox_input__2rEFp">
                <div className="input-group inline-block rounded relative w-full">
                  <input
                    size="20"
                    type="number"
                    className="p-1 mx-2 w-28 border transition text-14 input-field border-primary-3 focus:border-primary-4 bg-gray-6 text-white placeholder-gray-2"
                    value={filterItem.state.max}
                    onChange={(e) =>
                      handleChange("max", e.target.value, filterItem)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}
