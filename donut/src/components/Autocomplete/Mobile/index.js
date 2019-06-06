import React from "react";
import { get } from "lodash";
import Downshift from "downshift";
import { createPortal } from "react-dom";
import { FixedSizeList as List } from "react-window";
import MenuItem from "../Desktop/MenuItem";
import filterItems from "../filterItems";
import {
  Autocomplete as AutocompleteStyles,
  Input,
  MobileContainer,
  MobileContainerTop,
  MobileContainerBack,
  MobileContainerSearch,
  Label,
} from "../styles";

const AutocompleteMobile = ({
  options,
  placeholder,
  onBlur,
  onChange,
  label,
  initalSelectedItem,
}) => {
  const [open, setOpen] = React.useState(false);

  let portalRoot = document.querySelector(".js-donut-menu-portal");
  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.classList.add("js-donut-menu-portal");
    portalRoot.style.zIndex = 2000;
    portalRoot.style.position = "absolute";
    document.body.insertBefore(portalRoot, document.body.firstChild);
  }

  const handleChange = value => {
    setOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <AutocompleteStyles>
      <Label as="label" size="xs" weight="medium" color="neutral.N7">
        {label}
      </Label>
      <Input
        value={get(initalSelectedItem, "label", "")}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        readOnly
      />
      {open &&
        createPortal(
          <Downshift
            onChange={handleChange}
            initialSelectedItem={initalSelectedItem}
            initialInputValue=""
            itemToString={item => (item ? item.label : "")}
          >
            {downshift => {
              const items = filterItems(downshift, options);

              return (
                <MobileContainer {...downshift.getRootProps()}>
                  <MobileContainerTop>
                    <MobileContainerBack onClick={() => setOpen(false)}>
                      <svg
                        width="21"
                        height="18"
                        viewBox="0 0 21 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 9C0 8.73478 0.105357 8.48043 0.292893 8.29289L8.29289 0.292893C8.68342 -0.097631 9.31658 -0.097631 9.70711 0.292893C10.0976 0.683419 10.0976 1.31658 9.70711 1.70711L2.41421 9L9.70711 16.2929C10.0976 16.6834 10.0976 17.3166 9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071L0.292893 9.70711C0.105357 9.51957 0 9.26522 0 9Z"
                          fill="#1944DC"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21 10H1V8H21V10Z"
                          fill="#1944DC"
                        />
                      </svg>
                    </MobileContainerBack>
                    <MobileContainerSearch>
                      <Input
                        autoFocus
                        {...downshift.getInputProps({
                          placeholder,
                        })}
                      />
                    </MobileContainerSearch>
                  </MobileContainerTop>
                  <List
                    width="100%"
                    itemCount={items.length}
                    height={window.screen.height - 50}
                    itemSize={38}
                    itemData={{
                      items,
                      getItemProps: downshift.getItemProps,
                      highlightedIndex: downshift.highlightedIndex,
                      selectedItem: downshift.selectedItem,
                    }}
                  >
                    {MenuItem}
                  </List>
                </MobileContainer>
              );
            }}
          </Downshift>,
          portalRoot
        )}
    </AutocompleteStyles>
  );
};

export default AutocompleteMobile;
