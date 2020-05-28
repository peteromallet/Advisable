import React from "react";
import { StyledAvailabilityInputColumn } from "./styles";

const AvailabilityInputDay = React.memo(function AvailabilityInputDay({
  children,
}) {
  return (
    <StyledAvailabilityInputColumn>{children}</StyledAvailabilityInputColumn>
  );
});

export default AvailabilityInputDay;
