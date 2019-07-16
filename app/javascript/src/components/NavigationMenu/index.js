// Renders a vertical navigation menu. This is most often displayed in sidebars.
import * as React from "react";
import { Text } from "@advisable/donut";
import { NavigationMenu as Container } from "./styles";
import NavigationMenuItem from "./NavigationMenuItem";

const NavigationMenu = ({ title, children }) => {
  return (
    <Container>
      {title && (
        <Text
          mb="xs"
          size="xxs"
          color="neutral.3"
          weight="medium"
          css="text-transform: uppercase;"
        >
          {title}
        </Text>
      )}
      {children}
    </Container>
  );
};

NavigationMenu.Item = NavigationMenuItem;

export default NavigationMenu;
