import { memo } from "react";
import { StyledAvailabilityInputColumn } from "./styles";

const AvailabilityInputDay = memo(function AvailabilityInputDay({
  children,
}) {
  return (
    <StyledAvailabilityInputColumn>{children}</StyledAvailabilityInputColumn>
  );
});

export default AvailabilityInputDay;
