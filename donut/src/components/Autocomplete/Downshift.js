import React from "react";
import { find } from "lodash";
import Downshift from "downshift";

const DownshiftMulti = props => {
  const stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: props.multiple ? true : false,
          inputValue: props.multiple ? state.inputValue : changes.inputValue,
        };
      default:
        return changes;
    }
  };

  const removeItem = (item, downshift) => {
    const next = props.value.filter(i => i !== item.value);
    props.onChange(next, downshift);
  };

  const addSelectedItem = (item, downshift) => {
    const next = props.value.concat(item.value);
    props.onChange(next, downshift);
  };

  const handleSelection = (selectedItem, downshift) => {
    if (props.multiple) {
      if (props.value.includes(selectedItem.value)) {
        removeItem(selectedItem, downshift);
      } else {
        addSelectedItem(selectedItem, downshift);
      }
    } else {
      props.onChange(selectedItem, downshift);
    }
  };

  let selected;
  if (props.multiple) {
    selected = props.value.map(item => {
      return find(props.options, { value: item });
    });
  } else {
    selected = find(props.options, { value: props.value }) || null;
  }

  const downshiftProps = downshift => ({
    ...downshift,
    selected,
    remove: item => removeItem(item, downshift),
  });

  return (
    <Downshift
      {...props}
      onChange={handleSelection}
      selectedItem={props.multiple && null}
      stateReducer={stateReducer}
      itemToString={item => (item ? item.label : "")}
    >
      {downshift => props.children(downshiftProps(downshift))}
    </Downshift>
  );
};

export default DownshiftMulti;
