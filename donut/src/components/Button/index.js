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
const Button = ({ children, icon, loading, ...rest }) => {
  return (
    <ButtonStyles {...rest} isLoading={loading} data-loading={loading || null}>
      {loading && (
        <Loading>
          <Dot />
          <Dot />
          <Dot />
        </Loading>
      )}
      {icon && <Icon icon={icon} width={20} />}
      {children}
    </ButtonStyles>
  );
};

Button.defaultProps = {
  intent: "default",
  appearance: "default",
};

export default Button;
