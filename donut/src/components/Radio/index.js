import React from "react";
import {
  StyledRadio,
  StyledRadioInput,
  StyledRadioToggle,
  StyledRadioContent,
  StyledRadioLabel,
  StyledRadioDescription,
} from "./styles";

const Radio = ({ children, label, description, ...props }) => {
  return (
    <StyledRadio disabled={props.disabled}>
      <StyledRadioInput
        {...props}
        role="radio"
        type="radio"
        aria-checked={props.checked}
      />
      <StyledRadioToggle aria-hidden="true" />
      <StyledRadioContent>
        <StyledRadioLabel>{label}</StyledRadioLabel>
        {description && (
          <StyledRadioDescription>{description}</StyledRadioDescription>
        )}
        {children}
      </StyledRadioContent>
    </StyledRadio>
  );
};

export default Radio;
