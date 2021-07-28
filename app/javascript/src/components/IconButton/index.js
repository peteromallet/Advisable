import React from "react";
import {
  StyledIconButton,
  StyledIconButtonCircle,
  StyledIconButtonLabel,
} from "./styles";

function IconButton({ icon, label, ...props }) {
  return (
    <StyledIconButton {...props}>
      <StyledIconButtonCircle>
        {React.createElement(icon)}
      </StyledIconButtonCircle>
      {label && <StyledIconButtonLabel>{label}</StyledIconButtonLabel>}
    </StyledIconButton>
  );
}

IconButton.defaultProps = {
  size: "md",
  variant: "subtle",
};

export default IconButton;
