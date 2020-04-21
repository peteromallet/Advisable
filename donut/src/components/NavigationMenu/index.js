import React from "react";
import { Box } from "@advisable/donut";
import NavigationMenuItem from "./NavigationMenuItem";

function NavigationMenu({ children, ...props }) {
  return (
    <Box {...props}>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, { number: i + 1 }),
      )}
    </Box>
  );
}

NavigationMenu.Item = NavigationMenuItem;

export default NavigationMenu;
