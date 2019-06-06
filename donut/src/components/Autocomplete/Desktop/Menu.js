import React from "react";
import { get } from "lodash";
import { Popper } from "react-popper";
import { createPortal } from "react-dom";
import { FixedSizeList as List } from "react-window";
import { Menu as MenuStyles } from "../styles";
import MenuItem from "./MenuItem";
import filterItems from "../filterItems";

const Menu = ({ width, options, downshift }) => {
  if (!downshift.isOpen) return null;

  let portalRoot = document.querySelector(".js-donut-menu-portal");
  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.classList.add("js-donut-menu-portal");
    portalRoot.style.zIndex = 2000;
    portalRoot.style.position = "absolute";
    document.body.insertBefore(portalRoot, document.body.firstChild);
  }

  const { getItemProps, highlightedIndex, selectedItem } = downshift;

  let items = filterItems(downshift, options);
  let listHeight = items.length < 5 ? items.length * 38 : 200;

  return createPortal(
    <Popper
      placement="bottom"
      modifiers={{
        preventOverflow: {
          boundariesElement: "window",
        },
      }}
      positionFixed
    >
      {popper => (
        <div
          ref={popper.ref}
          style={{
            ...popper.style,
            width,
          }}
          data-placement={popper.placement}
        >
          <MenuStyles {...downshift.getMenuProps()}>
            <List
              width={width}
              itemCount={items.length}
              height={listHeight}
              itemSize={38}
              itemData={{
                items,
                getItemProps,
                highlightedIndex,
                selectedItem,
              }}
            >
              {MenuItem}
            </List>
          </MenuStyles>
        </div>
      )}
    </Popper>,
    portalRoot
  );
};

export default Menu;
