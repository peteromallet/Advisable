import React from "react";
import { isArray } from "lodash";
import { MenuItem as MenuItemStyles } from "./styles";

const MenuItem = ({ index, data, style }) => {
  const { items, getItemProps, highlightedIndex, selected, formatLabel } = data;
  const item = items[index];

  let isSelected;
  if (isArray(selected)) {
    isSelected = selected.indexOf(item) > -1;
  } else {
    isSelected = selected === item;
  }

  return (
    <MenuItemStyles
      {...getItemProps({
        style,
        item,
        index,
        selected: isSelected,
        highlighted: highlightedIndex === index,
      })}
    >
      {isSelected && (
        <svg
          width="15"
          height="11"
          viewBox="0 0 15 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.6866 0.272989C15.0881 0.652201 15.1062 1.28511 14.727 1.68663L6.22701 10.6866C6.03912 10.8856 5.7779 10.9988 5.50426 11C5.23061 11.0012 4.96844 10.8901 4.77886 10.6928L0.278857 6.00858C-0.103758 5.6103 -0.0910606 4.97726 0.307216 4.59465C0.705493 4.21203 1.33853 4.22473 1.72115 4.62301L5.49383 8.55013L13.273 0.313379C13.6522 -0.0881392 14.2851 -0.106222 14.6866 0.272989Z"
            fill="#1944DC"
          />
        </svg>
      )}
      {formatLabel(item)}
    </MenuItemStyles>
  );
};

export default MenuItem;
