import React from "react";
import { uniqueId } from "lodash";
import Downshift from "downshift";
import { Manager, Reference } from "react-popper";
import { Autocomplete as AutocompleteStyles, Label, Input } from "./styles";
import Menu from "./Menu";

const Autocomplete = ({
  options: selectOptions,
  onChange,
  onBlur,
  label,
  placeholder,
}) => {
  const [options, setOptions] = React.useState(
    selectOptions.map(option => ({
      ...option,
      key: uniqueId("autocompleteOption"),
    }))
  );

  return (
    <Downshift
      onChange={onChange}
      itemToString={item => (item ? item.label : "")}
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
          <Manager>
            <Reference>
              {popperRef => (
                <div ref={popperRef.ref}>
                  <Input
                    {...downshift.getInputProps({
                      placeholder,
                      onBlur,
                      onFocus: downshift.openMenu,
                      onClick: downshift.openMenu,
                    })}
                  />
                </div>
              )}
            </Reference>
            <Menu downshift={downshift} options={options} />
          </Manager>
        </AutocompleteStyles>
      )}
    </Downshift>
  );
};

export default Autocomplete;
