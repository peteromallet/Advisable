import React from "react";
import {
  useMenuState,
  MenuDisclosure,
  MenuItem as ReakitMenuItem,
} from "reakit/menu";
import Text from "../Text";

import { MenuList, MenuItemStyles } from "./styles";

const Menu = ({ items, trigger, ...props }) => {
  const menu = useMenuState();

  return (
    <>
      <MenuDisclosure {...menu}>
        {disclosureProps =>
          React.cloneElement(React.Children.only(trigger), disclosureProps)
        }
      </MenuDisclosure>
      <MenuList {...menu} {...props}>
        {items.map((item, i) => (
          <ReakitMenuItem {...menu} key={i}>
            {itemProps =>
              React.cloneElement(React.Children.only(item), itemProps)
            }
          </ReakitMenuItem>
        ))}
      </MenuList>
    </>
  );
};

const MenuItem = React.forwardRef(({ title, description, ...props }, ref) => {
  return (
    <MenuItemStyles ref={ref} {...props}>
      {title}
      {description && (
        <Text mt="xxs" fontSize="xxs" lineHeight="xxs" color="white.8">
          {description}
        </Text>
      )}
    </MenuItemStyles>
  );
});

Menu.Item = MenuItem;

export default Menu;
