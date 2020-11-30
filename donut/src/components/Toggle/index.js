import React from "react";
import {
  StyledToggle,
  StyledToggleLabel,
  StyledToggleThumb,
  StyledToggleInput,
  StyledToggleBackground,
} from "./styles";

function Toggle({ size, label, ...props }) {
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
      {label ? <StyledToggleLabel>{label}</StyledToggleLabel> : null}
    </StyledToggle>
  );
}

Toggle.defaultProps = {
  size: "md",
};

export default Toggle;
