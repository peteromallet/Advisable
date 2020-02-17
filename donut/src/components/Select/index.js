import React from "react";
import Icon from "../Icon";
import extractSpacingProps from "../../utilities/extractSpacingProps";
import withoutSpacingProps from "../../utilities/withoutSpacingProps";
import { StyledSelect, StyledSelectInput, StyledSelectArrow } from "./styles";

const Select = ({ children, placeholder, value, ...props }) => {
  const placeholderSelected = placeholder && !value;

  return (
    <StyledSelect {...extractSpacingProps(props)}>
      <StyledSelectInput
        placeholderSelected={placeholderSelected}
        value={value}
        {...withoutSpacingProps(props)}
      >
        {placeholder && (
          <option value="" disabled selected={placeholderSelected}>
            {placeholder}
          </option>
        )}
        {children}
      </StyledSelectInput>
      <StyledSelectArrow>
        <Icon icon="chevron-down" width={20} height={20} />
      </StyledSelectArrow>
    </StyledSelect>
  );
};

export default Select;
