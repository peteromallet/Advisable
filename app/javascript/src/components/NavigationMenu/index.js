// Renders a vertical navigation menu. This is most often displayed in sidebars.
import * as React from "react";
import { Box } from "@advisable/donut";
import NavigationMenuItem from "./NavigationMenuItem";

const NavigationMenu = ({ children, ...props }) => {
  const items = React.Children.toArray(children);

  return (
    <Box {...props}>
      {items.map((child, i) => {
        if (child === null) return null;
        return React.cloneElement(child, { number: i + 1 });
      })}
    </Box>
  );
};

NavigationMenu.Item = NavigationMenuItem;

export default NavigationMenu;
