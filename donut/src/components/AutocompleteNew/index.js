import React, { useState, useRef } from "react";
import { createPopper } from "@popperjs/core";
import { useCombobox } from "downshift";
import Input from "../Input";
import {
  StyledAutocomplete,
  StyledAutoCompleteMenu,
  StyledAutocompleteMenuItem,
} from "./styles";

function stateReducer(state, actionAndChanges) {
  const { type, changes } = actionAndChanges;
  // returning an uppercased version of the item string.
  switch (type) {
    case useCombobox.stateChangeTypes.ItemClick:
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.InputBlur:
      return {
        ...changes,
        // if we had an item selected.
        ...(changes.selectedItem && {
          // we will show it uppercased.
          inputValue: changes.selectedItem.label,
        }),
      };
    default:
      return changes; // otherwise business as usual.
  }
}

export default function Autocomplete({ prefix, suffix, options }) {
  const popperInstance = useRef(null);
  const [inputItems, setInputItems] = useState(options);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const combobox = useCombobox({
    stateReducer,
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        options.filter((item) =>
          item.label.toLowerCase().startsWith(inputValue.toLowerCase()),
        ),
      );
    },
  });

  React.useEffect(() => {
    if (referenceElement == null || popperElement == null) {
      return;
    }

    popperInstance.current = createPopper(referenceElement, popperElement, {
      placement: "bottom",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    });

    return () => popperInstance.current.destroy();
  }, [popperElement, referenceElement]);

  React.useEffect(() => {
    popperInstance.current?.update();
  }, [combobox.inputValue]);

  return (
    <StyledAutocomplete>
      <div
        {...combobox.getComboboxProps({
          ref: setReferenceElement,
        })}
      >
        <Input
          prefix={prefix}
          suffix={suffix}
          {...combobox.getInputProps({
            onFocus: () => {
              if (!combobox.isOpen) {
                combobox.openMenu();
              }
            },
          })}
        />
      </div>
      <StyledAutoCompleteMenu
        {...combobox.getMenuProps({
          ref: setPopperElement,
        })}
      >
        {combobox.isOpen &&
          inputItems.map((item, index) => (
            <StyledAutocompleteMenuItem
              style={
                combobox.highlightedIndex === index
                  ? { backgroundColor: "#bde4ff" }
                  : {}
              }
              key={`${item}${index}`}
              {...combobox.getItemProps({ item, index })}
            >
              {item.label}
            </StyledAutocompleteMenuItem>
          ))}
      </StyledAutoCompleteMenu>
    </StyledAutocomplete>
  );
}
