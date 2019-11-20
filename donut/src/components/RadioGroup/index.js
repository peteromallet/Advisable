import React from "react";
import { StyledRadioGroup } from "./styles";

const RadioGroup = ({ children, ...props }) => {
  return (
    <StyledRadioGroup role="radiogroup" {...props}>
      {children}
    </StyledRadioGroup>
  );
};

export default RadioGroup;
