import React from "react";
import { StyledBadge, StyledBadgePrefix, StyledBadgeSuffix } from "./styles";

const Badge = React.forwardRef(function Badge(
  { children, prefix, suffix, ...props },
  ref,
) {
  return (
    <StyledBadge {...props} ref={ref}>
      {prefix && <StyledBadgePrefix>{prefix}</StyledBadgePrefix>}
      {children}
      {suffix && <StyledBadgeSuffix>{suffix}</StyledBadgeSuffix>}
    </StyledBadge>
  );
});

const MemoizedBadge = React.memo(Badge);

MemoizedBadge.defaultProps = {
  variant: "cyan",
  size: "md",
};

export default MemoizedBadge;
