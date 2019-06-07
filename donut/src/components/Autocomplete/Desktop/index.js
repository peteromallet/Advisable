import React from "react";
import { Manager, Reference, Popper } from "react-popper";
import useComponentSize from "@rehooks/component-size";
import FieldError from "../../FieldError";
import Menu from "./Menu";
import {
  Autocomplete as AutocompleteStyles,
  Input,
  Label,
  Tags,
} from "../styles";
import Downshift from "../Downshift";
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
    value,
  } = props;

  const inputRef = React.useRef(null);
  const inputSize = useComponentSize(inputRef);
  const listRef = React.useRef(null);

  const handleStateChange = popper => (changes, downshift) => {
    popper.scheduleUpdate();

    if (changes.hasOwnProperty("highlightedIndex")) {
      if (listRef.current !== null) {
        listRef.current.scrollToItem(changes.highlightedIndex);
      }
    }
  };

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
            onStateChange={handleStateChange(popper)}
          >
            {downshift => (
              <AutocompleteStyles {...downshift.getRootProps()}>
                <Label
                  as="label"
                  size="xs"
                  weight="medium"
                  color="neutral.N7"
                  {...downshift.getLabelProps()}
                >
                  {label}
                </Label>
                <Reference>
                  {popperRef => (
                    <div ref={popperRef.ref}>
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
                  options={options}
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
