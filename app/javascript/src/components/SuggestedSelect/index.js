import React from "react";
import { map, isArray, isString, isObject, find } from "lodash";
import { Select } from "./styles";
import InputLabel from "src/components/InputLabel";

const SuggestedSelect = ({ onChange, label, value, ...props }) => {
  const handleChange = selected => {
    let value;

    if (props.isMulti) {
      value = map(selected, 'value')
    } else {
      value = selected.value
    }

    onChange(value);
  }

  // Allow the value prop to be a string or array of strings rather
  // than objects.
  let selectedValue = value;
  if (isArray(value)) {
    selectedValue = map(value, v => {
      if (isObject(v)) return v;
      return find(props.options, { value: v })
    })
  }

  if (isString(value)) {
    selectedValue = find(props.options, { value })
  }


  return (
    <React.Fragment>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        classNamePrefix="SuggestedSelect"
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        onChange={handleChange}
        value={selectedValue}
        {...props}
      />
    </React.Fragment>
  );
};

export default SuggestedSelect;
