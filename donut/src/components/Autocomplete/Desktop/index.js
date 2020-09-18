import React, { useState } from "react";
import { createPopper } from "@popperjs/core";
import useComponentSize from "@rehooks/component-size";
import Input from "../../Input";
import Menu from "./Menu";
import { Autocomplete as AutocompleteStyles, Tags } from "../styles";
import Downshift, { stateChangeTypes } from "../Downshift";
import Tag from "../Tag";

const AutocompleteDesktop = (props) => {
  const {
    size,
    onBlur,
    options,
    onChange,
    multiple,
    placeholder,
    value,
    primary,
    onPrimaryChange,
    formatLabel,
    ...rest
  } = props;

  const popper = React.useRef(null);
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);

  React.useEffect(() => {
    if (referenceElement && popperElement) {
      popper.current = createPopper(referenceElement, popperElement, {
        placement: "bottom",
      });

      return () => popper.current.destroy();
    }
  }, [referenceElement, popperElement]);

  const inputRef = React.useRef(null);
  const inputSize = useComponentSize(inputRef);
  const listRef = React.useRef(null);

  const handleStateChange = (changes, downshift) => {
    if (
      [stateChangeTypes.clickItem, stateChangeTypes.keyDownEnter].indexOf(
        changes.type,
      ) > -1
    ) {
      downshift.setState({
        inputValue: props.multiple
          ? ""
          : changes.inputValue || downshift.inputValue,
        isOpen: false,
      });
    }

    if (changes.hasOwnProperty("highlightedIndex")) {
      if (listRef.current !== null) {
        listRef.current.scrollToItem(changes.highlightedIndex);
      }
    }
  };

  let filteredOptions = options;
  if (props.multiple) {
    filteredOptions = options.filter((option) => {
      return value.indexOf(option.value) === -1;
    });
  }

  return (
    <Downshift
      value={value}
      options={options}
      multiple={multiple}
      onChange={onChange}
      primary={primary}
      selectedItem={value}
      onPrimaryChange={onPrimaryChange}
      initialInputValue={props.multiple ? undefined : value?.label}
      onStateChange={handleStateChange}
    >
      {(downshift) => (
        <AutocompleteStyles {...rest} {...downshift.getRootProps()}>
          <div ref={setReferenceElement}>
            <Input
              size={size}
              {...downshift.getInputProps({
                ref: inputRef,
                placeholder,
                onBlur,
                onFocus: downshift.openMenu,
                onClick: downshift.openMenu,
              })}
            />
          </div>
          {multiple && (
            <Tags>
              {downshift.selected.map((item) => (
                <Tag
                  key={item.value}
                  isPrimary={primary === item.value}
                  onSelectPrimary={
                    onPrimaryChange && (() => onPrimaryChange(item.value))
                  }
                  onRemove={() => downshift.remove(item)}
                >
                  {formatLabel(item)}
                </Tag>
              ))}
            </Tags>
          )}
          <Menu
            max={props.max}
            ref={setPopperElement}
            listRef={listRef}
            isMax={props.isMax}
            width={inputSize.width}
            downshift={downshift}
            options={filteredOptions}
            formatLabel={formatLabel}
          />
        </AutocompleteStyles>
      )}
    </Downshift>
  );
};

export default AutocompleteDesktop;
