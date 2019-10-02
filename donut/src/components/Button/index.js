import React from "react";
import Icon from "../Icon";
import { Button as ButtonStyles, ButtonText, Loading, Dot } from "./styles";

// Renders a button.. obviously
//
// == Props ==
// - appearance: 'default', 'primary' or 'minimal'. This determins the visual
// styling for the button.
// - intent: 'default', 'success', 'danger'. The intent prop dtermins the
// coloring for the button.
// - icon: Accepts any icon string for feather-icons.
const Button = React.forwardRef(
  ({ children, icon, iconRight, loading, size, align, ...rest }, ref) => {
    return (
      <ButtonStyles
        {...rest}
        ref={ref}
        size={size}
        data-align={align}
        data-right-icon={Boolean(iconRight)}
        aria-label={rest["aria-label"] || children}
        data-loading={loading || null}
      >
        {loading && (
          <Loading>
            <Dot />
            <Dot />
            <Dot />
          </Loading>
        )}
        {icon && <Icon icon={icon} width={20} />}
        {children && (
          <ButtonText hasIcon={Boolean(icon)} hasRightIcon={Boolean(iconRight)}>
            {children}
          </ButtonText>
        )}
        {iconRight && <Icon icon={iconRight} width={20} />}
      </ButtonStyles>
    );
  }
);

Button.defaultProps = {
  intent: "default",
  appearance: "default",
};

export default Button;
