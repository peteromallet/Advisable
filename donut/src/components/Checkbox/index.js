import React from "react";
import {
  StyledCheckbox,
  StyledCheckboxInput,
  StyledCheckboxToggle,
  StyledCheckboxContent,
  StyledCheckboxText,
} from "./styles";

const Checkbox = ({ children, ...props }) => {
  return (
    <StyledCheckbox>
      <StyledCheckboxInput
        {...props}
        role="checkbox"
        type="checkbox"
        aria-checked={props.checked}
      />
      <StyledCheckboxToggle aria-hidden="true">
        {props.checked && (
          <svg width={14} height={14} fill="none">
            <path
              d="M3 7.243L5 10l6-6"
              stroke="white"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </StyledCheckboxToggle>
      <StyledCheckboxContent>
        <StyledCheckboxText>{children}</StyledCheckboxText>
      </StyledCheckboxContent>
    </StyledCheckbox>
  );
};

export default Checkbox;
