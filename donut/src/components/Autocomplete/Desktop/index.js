import React from "react";
import { Manager, Reference, Popper } from "react-popper";
import useComponentSize from "@rehooks/component-size";
import Text from "../../Text";
import FieldError from "../../FieldError";
import Menu from "./Menu";
import {
  Autocomplete as AutocompleteStyles,
  Input,
  Label,
  Tags,
} from "../styles";
import Downshift, { stateChangeTypes } from "../Downshift";
import Tag from "../Tag";

const AutocompleteDesktop = props => {
  const {
    label,
    error,
    onBlur,
    options,
    onChange,
    multiple,
    placeholder,
    description,
    value,
    primary,
    onPrimaryChange,
    formatLabel,
    ...rest
  } = props;

  const inputRef = React.useRef(null);
  const inputSize = useComponentSize(inputRef);
  const listRef = React.useRef(null);

  const handleStateChange = popper => (changes, downshift) => {
    popper.scheduleUpdate();

    if (
      [stateChangeTypes.clickItem, stateChangeTypes.keyDownEnter].indexOf(
        changes.type
      ) > -1
    ) {
      downshift.setState({
        inputValue: props.multiple ? "" : changes.inputValue,
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
    filteredOptions = options.filter(option => {
      return value.indexOf(option.value) === -1;
    });
  }

  return (
    <Manager>
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
          <Downshift
            value={value}
            options={options}
            multiple={multiple}
            onChange={onChange}
            primary={primary}
            onPrimaryChange={onPrimaryChange}
            initialInputValue={props.multiple ? undefined : value?.label}
            onStateChange={handleStateChange(popper)}
          >
            {downshift => (
              <AutocompleteStyles {...rest} {...downshift.getRootProps()}>
                <Label
                  as="label"
                  fontSize="s"
                  color="neutral.8"
                  fontWeight="medium"
                  {...downshift.getLabelProps()}
                >
                  {label}
                </Label>
                {description && (
                  <Text
                    mb="s"
                    mt="-4px"
                    fontSize="xs"
                    lineHeight="xs"
                    color="neutral.6"
                  >
                    {description}
                  </Text>
                )}
                <Reference>
                  {popperRef => (
                    <>
                      <div ref={popperRef.ref}>
                        <Input
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
                          {downshift.selected.map(item => (
                            <Tag
                              key={item.value}
                              isPrimary={primary === item.value}
                              onSelectPrimary={
                                onPrimaryChange &&
                                (() => onPrimaryChange(item.value))
                              }
                              onRemove={() => downshift.remove(item)}
                            >
                              {formatLabel(item)}
                            </Tag>
                          ))}
                        </Tags>
                      )}
                    </>
                  )}
                </Reference>
                {error && <FieldError>{error}</FieldError>}
                <Menu
                  max={props.max}
                  popper={popper}
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
        )}
      </Popper>
    </Manager>
  );
};

export default AutocompleteDesktop;
