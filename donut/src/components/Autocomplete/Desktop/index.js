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
            initialInputValue={props.multiple ? undefined : value}
            onStateChange={handleStateChange(popper)}
          >
            {downshift => {
              const inputProps = {
                ...downshift.getInputProps({
                  ref: inputRef,
                  placeholder,
                  onBlur,
                  onFocus: downshift.openMenu,
                  onClick: downshift.openMenu,
                }),
              };

              return (
                <AutocompleteStyles {...downshift.getRootProps()}>
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
                          <Input {...inputProps} value={inputProps.value} />
                        </div>
                        {multiple && (
                          <Tags>
                            {downshift.selected.map(item => (
                              <Tag
                                key={item.value}
                                onRemove={() => downshift.remove(item)}
                              >
                                {item.label}
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
                  />
                </AutocompleteStyles>
              );
            }}
          </Downshift>
        )}
      </Popper>
    </Manager>
  );
};

export default AutocompleteDesktop;
