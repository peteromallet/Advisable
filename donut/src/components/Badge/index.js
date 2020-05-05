import React from "react";
import { StyledBadge, StyledBadgePrefix, StyledBadgeSuffix } from "./styles";

const Badge = React.memo(function Badge({
  children,
  prefix,
  suffix,
  ...props
}) {
  return (
    <StyledBadge {...props}>
      {prefix && <StyledBadgePrefix>{prefix}</StyledBadgePrefix>}
      {children}
      {suffix && <StyledBadgeSuffix>{suffix}</StyledBadgeSuffix>}
    </StyledBadge>
  );
});

Badge.defaultProps = {
  variant: "cyan",
};

export default Badge;
