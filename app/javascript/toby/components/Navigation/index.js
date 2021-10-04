import React from "react";
import { motion } from "framer-motion";
import { useMenuState, MenuButton, Menu } from "reakit/Menu";
import { Menu as MenuIcon } from "@styled-icons/heroicons-solid/Menu";
import { Table } from "@styled-icons/heroicons-solid/Table";
import { pluralizeType } from "../../utilities";
import { useResources } from "../resources";
import {
  StyledNavigation,
  StyledCurrentResource,
  StyledResourceLink,
  StyledResourceMenu,
} from "../../styles";

export default function Navigation({ resource }) {
  const resources = useResources();
  const menu = useMenuState();

  return (
    <StyledNavigation>
      <MenuButton {...menu}>
        {(menuButton) => (
          <StyledCurrentResource {...menuButton}>
            <MenuIcon />
            <span>{pluralizeType(resource.type)}</span>
          </StyledCurrentResource>
        )}
      </MenuButton>
      <Menu {...menu} style={{ zIndex: 10, left: 16, top: -4 }}>
        <StyledResourceMenu
          as={motion.div}
          animate={{
            opacity: menu.visible ? 1 : 0,
            y: menu.visible ? 0 : 12,
          }}
        >
          {resources.map((r) => (
            <StyledResourceLink key={r.type} to={`/${pluralizeType(r.type)}`}>
              <Table />
              <span>{pluralizeType(r.type)}</span>
            </StyledResourceLink>
          ))}
        </StyledResourceMenu>
      </Menu>
    </StyledNavigation>
  );
}
