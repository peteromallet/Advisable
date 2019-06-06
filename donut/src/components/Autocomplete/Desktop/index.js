import React from "react";
import { get } from "lodash";
import Downshift from "downshift";
import { Manager, Reference } from "react-popper";
import useComponentSize from "@rehooks/component-size";
import Menu from "./Menu";
import { Autocomplete as AutocompleteStyles, Input, Label } from "../styles";

const AutocompleteDesktop = ({
  label,
  onBlur,
  options,
  onChange,
  placeholder,
  initalSelectedItem,
}) => {
  const inputRef = React.useRef(null);
  const inputSize = useComponentSize(inputRef);

  return (
    <Downshift
      onChange={onChange}
      initialSelectedItem={initalSelectedItem}
      initialInputValue={get(initalSelectedItem, "label")}
      itemToString={item => (item ? item.label : "")}
    >
      {downshift => (
        <AutocompleteStyles
          isOpen={downshift.isOpen}
          {...downshift.getRootProps()}
        >
          <Label
            as="label"
            size="xs"
            weight="medium"
            color="neutral.N7"
            {...downshift.getLabelProps()}
          >
            {label}
          </Label>
          <Manager>
            <Reference>
              {popperRef => (
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
              )}
            </Reference>
            <Menu
              width={inputSize.width}
              downshift={downshift}
              options={options}
            />
          </Manager>
        </AutocompleteStyles>
      )}
    </Downshift>
  );
};

export default AutocompleteDesktop;
