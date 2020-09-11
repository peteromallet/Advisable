import React from "react";
import { StyledLabel } from "./styles";

const Label = (props) => {
  return <StyledLabel {...props} />;
};

Label.defaultProps = {
  as: "label",
  color: "neutral800",
  fontWeight: "medium",
  fontSize: "md",
  letterSpacing: "-0.01em",
};

export default Label;
