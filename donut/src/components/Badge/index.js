import React from "react";
import { StyledBadge, StyledBadgePrefix, StyledBadgeSuffix } from "./styles";

const Badge = React.forwardRef(
  ({ children, prefix, suffix, ...props }, ref) => (
    <StyledBadge {...props} ref={ref}>
      {prefix && <StyledBadgePrefix>{prefix}</StyledBadgePrefix>}
      {children}
      {suffix && <StyledBadgeSuffix>{suffix}</StyledBadgeSuffix>}
    </StyledBadge>
  ),
);

const MemoizedBadge = React.memo(Badge);

MemoizedBadge.defaultProps = {
  variant: "cyan",
};

export default MemoizedBadge;
