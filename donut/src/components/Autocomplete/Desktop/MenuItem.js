import React from "react";
import { MenuItem as MenuItemStyles } from "../styles";

const MenuItem = ({ index, data, style }) => {
  const { items, getItemProps, highlightedIndex, selectedItem } = data;
  const item = items[index];

  return (
    <MenuItemStyles
      {...getItemProps({
        style,
        item,
        index,
        selected: selectedItem === item,
        highlighted: highlightedIndex === index,
      })}
    >
      {item.label}
    </MenuItemStyles>
  );
};

export default MenuItem;
