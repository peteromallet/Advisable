import React from "react";
import { Select } from './styles';

const SuggestedSelect = ({ onChange, ...props }) => {
  const handleChange = option => onChange(option.value);

  return (
    <Select
      classNamePrefix="SuggestedSelect"
      menuPortalTarget={document.body}
      onChange={handleChange}
      {...props}
    />
  );
};

export default SuggestedSelect;
