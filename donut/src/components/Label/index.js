import React from "react";
import { StyledLabel } from "./styles";

const Label = (props) => {
  return <StyledLabel {...props} />;
};

Label.defaultProps = {
  as: "label",
  color: "neutral900",
  fontWeight: "medium",
  lineHeight: "s",
};

export default Label;
