import * as React from "react";
import { isFunction } from "lodash";
import Popover from "../Popover";
import Item from "./Item";
import Meatballs from "./Meatballs";
import { Menu as Container, Popout } from "./styles";

const Menu = ({ children }) => {
  return (
    <Container>
      <Popover placement="bottom-end" trigger={<Meatballs />}>
        {popover => (
          <Popout>{isFunction(children) ? children(popover) : children}</Popout>
        )}
      </Popover>
    </Container>
  );
};

Menu.Item = Item;

export default Menu;
