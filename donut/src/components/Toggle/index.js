import React from "react";
import {
  StyledToggle,
  StyledToggleThumb,
  StyledToggleInput,
  StyledToggleBackground,
} from "./styles";

function Toggle({ size, ...props }) {
  return (
    <StyledToggle
      size={size}
      data-disabled={props.disabled}
      $disabled={props.disabled}
      $checked={props.value}
    >
      <StyledToggleInput type="checkbox" {...props} />
      <StyledToggleBackground>
        <StyledToggleThumb />
      </StyledToggleBackground>
    </StyledToggle>
  );
}

Toggle.defaultProps = {
  size: "md",
};

export default Toggle;
