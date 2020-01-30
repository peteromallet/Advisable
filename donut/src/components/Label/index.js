import React from "react";
import { StyledLabel } from "./styles";

const Label = props => {
  return <StyledLabel {...props} />;
};

Label.defaultProps = {
  as: "label",
  fontSize: "s",
  color: "neutral.8",
  fontWeight: "medium",
  letterSpacing: "-0.02em",
};

export default Label;
