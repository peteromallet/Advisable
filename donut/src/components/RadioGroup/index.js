import React from "react";
import { StyledRadioGroup } from "./styles";

const RadioGroup = ({ children }) => {
  return <StyledRadioGroup role="radiogroup">{children}</StyledRadioGroup>;
};

export default RadioGroup;
