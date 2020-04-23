import React from "react";
import { Box } from "@advisable/donut";
import NavigationMenuItem from "./NavigationMenuItem";

function NavigationMenu({ children, ...props }) {
  const items = React.Children.toArray(children);
  return (
    <Box {...props}>
      {items.map((child, i) => {
        if (child === null) return null;
        return React.cloneElement(child, { number: i + 1 });
      })}
    </Box>
  );
}

NavigationMenu.Item = NavigationMenuItem;

export default NavigationMenu;
