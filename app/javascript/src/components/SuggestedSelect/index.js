import React from "react";
import Select from "react-select";

const SuggestedSelect = ({ onChange, ...props }) => {
  const handleChange = option => onChange(option.value);

  return (
    <Select
      menuPortalTarget={document.body}
      onChange={handleChange}
      {...props}
    />
  );
};

export default SuggestedSelect;
