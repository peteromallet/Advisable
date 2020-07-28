import React, { useState } from "react";
import { ChevronDown } from "@styled-icons/feather";
import {
  StyledSelect,
  StyledSelectArrow,
  StyledSelectControl,
  StyledSelectDecoration,
  StyledSelectControlWraper,
} from "./styles";

const Select = React.forwardRef(function Select(
  {
    children,
    placeholder,
    value,
    size,
    prefix,
    suffix,
    error,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginX,
    marginY,
    ...props
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const placeholderSelected = placeholder && !value;

  const handleFocus = (e) => {
    setFocused(true);
    props.onFocus(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    props.onBlur(e);
  };

  return (
    <StyledSelect
      $focused={focused}
      $error={error}
      $disabled={props.disabled}
      $placeholderSelected={placeholderSelected}
      size={size}
      margin={margin}
      marginX={marginX}
      marginY={marginY}
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
    >
      {prefix && <StyledSelectDecoration>{prefix}</StyledSelectDecoration>}
      <StyledSelectControlWraper>
        <StyledSelectControl
          {...props}
          ref={ref}
          as="select"
          value={value || ""}
          onBlur={handleBlur}
          onFocus={handleFocus}
        >
          {placeholder && (
            <option key="placeholder" value="" hidden disabled>
              {placeholder}
            </option>
          )}
          {children}
        </StyledSelectControl>
        <StyledSelectArrow size={size}>
          <ChevronDown size={20} strokeWidth={2} />
        </StyledSelectArrow>
      </StyledSelectControlWraper>
      {suffix && <StyledSelectDecoration>{suffix}</StyledSelectDecoration>}
    </StyledSelect>
  );
});

Select.defaultProps = {
  onBlur: () => {},
  onFocus: () => {},
  size: "md",
};

export default Select;
