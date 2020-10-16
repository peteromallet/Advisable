import { useState } from "react";
import { X } from "@styled-icons/feather";
import { useCombobox, useMultipleSelection } from "downshift";
import { StyledMultipleSelect, StyledMultipleSelectTag } from "./styles";

export default function MultipleSelect() {
  const items = [
    "Facebook Advertising",
    "Content Marketing",
    "Marketing Strategy",
    "Digital Marketing",
    "Linkedin Marketing",
  ];
  const [inputValue, setInputValue] = useState("");

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems: [] });

  const getFilteredItems = (items) =>
    items.filter(
      (item) =>
        selectedItems.indexOf(item) < 0 &&
        item.toLowerCase().startsWith(inputValue.toLowerCase()),
    );

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    inputValue,
    items: getFilteredItems(items),
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue("");
            addSelectedItem(selectedItem);
            selectItem(null);
          }

          break;
        default:
          break;
      }
    },
  });

  return (
    <>
      <StyledMultipleSelect>
        {selectedItems.map((selectedItem, index) => (
          <StyledMultipleSelectTag
            key={`selected-item-${index}`}
            {...getSelectedItemProps({ selectedItem, index })}
          >
            {selectedItem}
            <span onClick={() => removeSelectedItem(selectedItem)}>
              <X size={16} strokeWidth={2} />
            </span>
          </StyledMultipleSelectTag>
        ))}

        <div {...getComboboxProps()}>
          <input
            placeholder="e.g Placeholder"
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          />
        </div>
      </StyledMultipleSelect>

      <ul {...getMenuProps()}>
        {isOpen &&
          getFilteredItems(items).map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: "#bde4ff" } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </>
  );
}
