// Renders a vertical navigation menu. This is most often displayed in sidebars.
import * as React from "react";
import { NavigationMenu as Container } from "./styles";
import NavigationMenuItem from "./NavigationMenuItem";

const NavigationMenu = ({ children }) => {
  return <Container>{children}</Container>;
};

NavigationMenu.Item = NavigationMenuItem

export default NavigationMenu;
