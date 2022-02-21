import React, { useState } from "react";

export default function ButtonSelectionFilter({
  filterList,
  FilterComponent,
  onSelection,
}) {
  const [optionSelected, setOptionSelected] = useState();

  const handleSelection = (item) => {
    if (optionSelected === item.text) {
      setOptionSelected("");
    } else {
      setOptionSelected(item.text);
    }

    onSelection(item);
  };
  return filterList.map((item) => {
    return (
      <FilterComponent
        selected={item.text === optionSelected}
        key={item.text}
        text={item.text}
        icon={item.icon}
        color={item.color}
        onClick={() => handleSelection(item)}
      />
    );
  });
}
