import React from "react";
import {
  StyledRadio,
  StyledRadioInput,
  StyledRadioToggle,
  StyledRadioContent,
} from "./styles";

const Selection = ({ children, ...props }) => {
  return (
    <StyledRadio disabled={props.disabled}>
      <StyledRadioInput
        {...props}
        role="radio"
        type="radio"
        aria-checked={props.checked}
      />
      <StyledRadioToggle aria-hidden="true" />
      <StyledRadioContent>{children}</StyledRadioContent>
    </StyledRadio>
  );
};

export default Selection;
