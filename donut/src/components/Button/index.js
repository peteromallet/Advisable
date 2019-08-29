import React from "react";
import Icon from "../Icon";
import { Button as ButtonStyles, Loading, Dot } from "./styles";

// Renders a button.. obviously
//
// == Props ==
// - appearance: 'default', 'primary' or 'minimal'. This determins the visual
// styling for the button.
// - intent: 'default', 'success', 'danger'. The intent prop dtermins the
// coloring for the button.
// - icon: Accepts any icon string for feather-icons.
const Button = ({ children, icon, iconRight, loading, size, ...rest }) => {
  return (
    <ButtonStyles
      {...rest}
      size={size}
      isLoading={loading}
      iconRight={iconRight}
      data-loading={loading || null}
    >
      {loading && (
        <Loading>
          <Dot />
          <Dot />
          <Dot />
        </Loading>
      )}
      {icon && <Icon mr="xs" icon={icon} width={20} />}
      {children}
      {iconRight && <Icon ml="xs" icon={iconRight} width={20} />}
    </ButtonStyles>
  );
};

Button.defaultProps = {
  intent: "default",
  appearance: "default",
};

export default Button;
