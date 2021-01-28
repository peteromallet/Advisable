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
  lineHeight: "1.2",
  letterSpacing: "-0.01em",
};

export default Label;
