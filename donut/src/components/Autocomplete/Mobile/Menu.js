import React from "react";
import { createPortal } from "react-dom";
import { FixedSizeList as List } from "react-window";
import { Box } from "@advisable/donut";
import MenuItem from "../MenuItem";
import filterItems from "../filterItems";
import Back from "./Back";
import Text from "../../Text";
import getPortalTarget from "../portralTarget";
import Downshift from "../Downshift";
import {
  Input,
  MobileContainer,
  MobileContainerTop,
  MobileContainerSearch,
} from "../styles";

const AutocompleteMobileMenu = (props) => {
  const {
    options,
    placeholder,
    onChange,
    onClose,
    initalSelectedItem,
    formatLabel,
  } = props;
  let portalRoot = getPortalTarget();

  return createPortal(
    <Downshift
      value={props.value}
      options={options}
      multiple={props.multiple}
      onChange={onChange}
      initialSelectedItem={initalSelectedItem}
      initialInputValue=""
      itemToString={(item) => (item ? item.label : "")}
    >
      {(downshift) => {
        let items = filterItems(downshift, options);

        if (props.isMax) {
          items = downshift.selected;
        }

        return (
          <MobileContainer {...downshift.getRootProps()}>
            <MobileContainerTop>
              <Back onClick={onClose} />
              <MobileContainerSearch>
                <Input
                  autoFocus
                  {...downshift.getInputProps({
                    placeholder,
                  })}
                />
              </MobileContainerSearch>
            </MobileContainerTop>
            {props.isMax && (
              <Box padding="s">
                <Text multiline color="neutral.N8">
                  You can not add more than {props.max} items. Please remove one
                  of the following selections to add another.
                </Text>
              </Box>
            )}
            <List
              width="100%"
              itemCount={items.length}
              height={window.screen.height - 50}
              itemSize={38}
              itemData={{
                items,
                getItemProps: downshift.getItemProps,
                highlightedIndex: downshift.highlightedIndex,
                selected: downshift.selected,
                formatLabel,
              }}
            >
              {MenuItem}
            </List>
          </MobileContainer>
        );
      }}
    </Downshift>,
    portalRoot,
  );
};

export default AutocompleteMobileMenu;
