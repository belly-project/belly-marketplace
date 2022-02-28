import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { Collapse } from "react-collapse";

export default function FilterSection({
  isCollapse,
  collapseState,
  setCollapseState,
  children,
  filterState,
  setFiltersState,
  sectionState,
  title,
  resetSectionState,
  action,
}) {
  useEffect(() => {
    let _f = filterState;

    delete _f[title.toLowerCase()];

    _f[title.toLowerCase()] = sectionState;

    setFiltersState(_f);
    return () => {};
  }, [filterState, sectionState, setFiltersState, title]);

  return (
    <div className="" style={{ boxSizing: "border-box" }}>
      <div className="CollapsePannel_container_classes py-4 pr-2 pl-4 border-t border-#3a3f50">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer w-full">
            {isCollapse && (
              <div
                onClick={() => setCollapseState(!collapseState)}
                className="CollapseTrigger_icon__2dF5B CollapseTrigger_isOpen__EdE8Y"
              >
                <Icon
                  icon={`ant-design:caret-${
                    collapseState ? "down" : "right"
                  }-filled`}
                  color="gray"
                />
              </div>
            )}
            <div className="ml-3 font-la text-28 flex justify-between w-full">
              {title}
            </div>
            {(action || resetSectionState) && (
              <div className="flex justify-between w-full">
                {action && (
                  <button
                    onClick={(e) => action.onClick()}
                    className="mr-3 font-la text-primary-4 text-28"
                  >
                    Apply
                  </button>
                )}
                {resetSectionState && (
                  <button
                    onClick={(e) => resetSectionState()}
                    className="mr-3 font-la text-primary-4 text-28"
                  >
                    Reset
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {collapseState && isCollapse && (
          <Collapse isOpened={collapseState}>
            <div className="flex flex-wrap mt-4">{children}</div>
          </Collapse>
        )}
        {!isCollapse && <div className="flex flex-wrap mt-4">{children}</div>}
      </div>
    </div>
  );
}
