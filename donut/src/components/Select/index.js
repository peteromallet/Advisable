import React from "react";
import { ChevronDown } from "@styled-icons/feather";
import extractSpacingProps from "../../utilities/extractSpacingProps";
import withoutSpacingProps from "../../utilities/withoutSpacingProps";
import { StyledSelect, StyledSelectInput, StyledSelectArrow } from "./styles";

const Select = ({ children, placeholder, value, ...props }) => {
  const placeholderSelected = placeholder && !value;

  return (
    <StyledSelect {...extractSpacingProps(props)}>
      <StyledSelectInput
        placeholderSelected={placeholderSelected}
        value={value || ""}
        {...withoutSpacingProps(props)}
      >
        {placeholder && (
          <option key="placeholder" value="" hidden disabled>
            {placeholder}
          </option>
        )}
        {children}
      </StyledSelectInput>
      <StyledSelectArrow>
        <ChevronDown size={20} strokeWidth={2} />
      </StyledSelectArrow>
    </StyledSelect>
  );
};

export default Select;
