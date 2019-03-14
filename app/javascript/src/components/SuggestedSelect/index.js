import React from "react";
import { components } from "react-select";
import { map, isArray, isString, isObject, find } from "lodash";
import { Select, MenuContainer } from "./styles";
import InputLabel from "src/components/InputLabel";
import InputSubLabel from "src/components/InputSubLabel";

const Menu = props => {
  return (
    <MenuContainer>
      <components.Menu {...props}>{props.children}</components.Menu>
    </MenuContainer>
  );
};

// Renders a suggested select input. This uses the react-select package
// behind the scenes. You can pass the 'isMulti' prop to create a multiple
// select tag input.
const SuggestedSelect = ({
  max,
  label,
  value,
  options,
  onChange,
  subLabel,
  ...props
}) => {
  // By default the react-select package passes the selected option object
  // rather than its value key so we intercept that event passing only the
  // value to the onChange prop rather than the entire object.
  // e.g just "Marketing" instead of  { label: "Marketing", value: "Marketing" }
  const handleChange = selected => {
    let value;

    if (props.isMulti) {
      value = map(selected, "value");
    } else {
      value = selected.value;
    }

    onChange(value);
  };

  // react-select expects the value prop to be the full object option rather
  // than just the value so again we intercept the passed 'value' prop and
  // find its associated object which we then pass into react-select.
  // e.g value="Sales" instead of value={{ label: "Sales", value: "Sales"}}
  let selectedValue = value;
  if (isArray(value)) {
    selectedValue = map(value, v => {
      if (isObject(v)) return v;
      return find(options, { value: v });
    });
  }

  if (isString(value)) {
    selectedValue = find(options, { value });
  }

  let filteredOptions = options;
  let isMax = max && isArray(value) && value.length === max;
  // If the max prop is passed then check that we haven't hit that limit and if
  // we have then set the options to an empty array.
  if (isMax) {
    filteredOptions = [];
  }

  let noOptionsMessage = props.noOptionsMessage;

  if (isMax) {
    noOptionsMessage = () => {
      return `You can not add more than ${max} items.`
    }
  }

  return (
    <React.Fragment>
      {label && <InputLabel>{label}</InputLabel>}
      {subLabel && <InputSubLabel>{subLabel}</InputSubLabel>}
      <Select
        classNamePrefix="SuggestedSelect"
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        onChange={handleChange}
        components={{ Menu }}
        value={selectedValue}
        options={filteredOptions}
        noOptionsMessage={noOptionsMessage}
        {...props}
      />
    </React.Fragment>
  );
};

export default SuggestedSelect;
