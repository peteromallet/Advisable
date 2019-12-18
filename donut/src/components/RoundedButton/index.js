// RoundedButton is a new style of button added to Donut in Nov 2019. It should
// be used instead of the Button component.
// TODO: Eventually all buttons should be moved over to use this component and
// it should simply be renamed to Button.
import React from "react";
import {
  StyledButton,
  StyledButtonPrefix,
  StyledButtonSuffix,
  Loading,
} from "./styles";

const Button = React.forwardRef(
  ({ children, loading, disabled, prefix, suffix, ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        isLoading={loading}
        aria-label={children}
        data-loading={loading}
        disabled={loading || disabled}
        {...props}
      >
        {loading && (
          <Loading>
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
              <path
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                d="M17 9a8 8 0 11-8-8"
              />
            </svg>
          </Loading>
        )}
        {prefix && <StyledButtonPrefix>{prefix}</StyledButtonPrefix>}
        {children}
        {suffix && <StyledButtonSuffix>{suffix}</StyledButtonSuffix>}
      </StyledButton>
    );
  }
);

Button.defaultProps = {
  size: "m",
};

export default Button;
