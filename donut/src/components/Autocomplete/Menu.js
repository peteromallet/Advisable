import React from "react";
import { Popper } from "react-popper";
import { createPortal } from "react-dom";
import { Menu as MenuStyles, MenuItem } from "./styles";

const Menu = ({ options, downshift }) => {
  if (!downshift.isOpen) return null;

  let portalRoot = document.querySelector(".js-donut-menu-portal");
  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.classList.add("js-donut-menu-portal");
    portalRoot.style.position = "absolute";
    portalRoot.style.zIndex = 1000;
    document.body.appendChild(portalRoot);
  }

  const {
    inputValue,
    getItemProps,
    highlightedIndex,
    selectedItem,
  } = downshift;

  let items = options;

  if (selectedItem && inputValue !== selectedItem.label) {
    items = options.filter(item => {
      return !inputValue || item.label.includes(inputValue);
    });
  }

  return createPortal(
    <Popper placement="bottom-start" positionFixed>
      {popper => (
        <div
          ref={popper.ref}
          style={{
            ...popper.style,
            width: "200px",
          }}
          data-placement={popper.placement}
        >
          <MenuStyles {...downshift.getMenuProps()}>
            {items.map((item, index) => (
              <MenuItem
                selected={selectedItem === item}
                highlighted={highlightedIndex === index}
                {...getItemProps({ key: item.key, index, item })}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuStyles>
        </div>
      )}
    </Popper>,
    portalRoot
  );
};

export default Menu;
