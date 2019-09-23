import React from "react";
import { createPortal } from "react-dom";
import { FixedSizeList as List } from "react-window";
import Text from "../../Text";
import Padding from "../../Padding";
import { Menu as MenuStyles } from "../styles";
import MenuItem from "../MenuItem";
import filterItems from "../filterItems";
import getPortalTarget from "../portralTarget";

const Menu = ({ popper, width, listRef, options, downshift, max, isMax }) => {
  if (!downshift.isOpen) return null;

  let portalRoot = getPortalTarget();
  const { getItemProps, highlightedIndex, selected } = downshift;

  let items = filterItems(downshift, options);
  let listHeight = items.length < 5 ? items.length * 32 : 160;

  return createPortal(
    <div
      ref={popper.ref}
      style={{ ...popper.style, width }}
      data-placement={popper.placement}
    >
      <MenuStyles {...downshift.getMenuProps()}>
        {isMax ? (
          <Padding size="m">
            <Text color="neutral.N5" size="xs" css="text-align: center;">
              You can not add more than {max} items
            </Text>
          </Padding>
        ) : (
          <List
            width={width}
            ref={listRef}
            itemCount={items.length}
            height={listHeight}
            itemSize={32}
            itemData={{
              items,
              getItemProps,
              highlightedIndex,
              selected,
            }}
          >
            {MenuItem}
          </List>
        )}
      </MenuStyles>
    </div>,
    portalRoot
  );
};

export default Menu;
