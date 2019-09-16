import React, { useContext } from "react";
import { useMenuState, MenuDisclosure } from "reakit";
import Text from "../Text";
import MenuContext from "./context";
import { StyledMenu, StyledMenuItem } from "./styles";

const Menu = ({
  state,
  items,
  trigger,
  placement,
  children,
  width,
  ...props
}) => {
  const menu = state || useMenuState({ placement });

  return (
    <MenuContext.Provider value={menu}>
      <MenuDisclosure {...menu}>
        {disclosureProps =>
          React.cloneElement(React.Children.only(trigger), disclosureProps)
        }
      </MenuDisclosure>
      <StyledMenu {...menu} {...props} width={width}>
        {children}
      </StyledMenu>
    </MenuContext.Provider>
  );
};

const MenuItem = React.forwardRef(({ title, description, ...props }, ref) => {
  const menu = useContext(MenuContext);

  let onClick;
  if (props.onClick) {
    onClick = e => {
      props.onClick(e, menu);
    };
  }

  return (
    <StyledMenuItem ref={ref} {...menu} {...props} onClick={onClick}>
      {title}
      {description && (
        <Text
          mt="xxs"
          fontSize="xxs"
          lineHeight="xxs"
          fontWeight={300}
          color="white.7"
        >
          {description}
        </Text>
      )}
    </StyledMenuItem>
  );
});

Menu.Item = MenuItem;

export default Menu;
