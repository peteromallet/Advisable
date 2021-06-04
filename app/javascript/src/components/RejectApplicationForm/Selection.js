import uniqueId from "lodash/uniqueId";
import React, { useMemo } from "react";
import { StyledRadio, StyledRadioInput, StyledRadioToggle } from "./styles";

const Selection = ({ children, ...props }) => {
  const id = useMemo(() => props.id || uniqueId("selection"), [props.id]);

  return (
    <>
      <StyledRadioInput
        {...props}
        role="radio"
        type="radio"
        id={id}
        aria-checked={props.checked}
      />
      <StyledRadio
        htmlFor={id}
        data-checked={props.checked}
        disabled={props.disabled}
      >
        <StyledRadioToggle aria-hidden="true" />
        {children}
      </StyledRadio>
    </>
  );
};

export default Selection;
