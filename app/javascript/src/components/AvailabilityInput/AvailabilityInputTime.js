import React from "react";
import { Check } from "@styled-icons/feather";
import { Circle } from "@advisable/donut";
import {
  StyledAvailabilityInputCell,
  StyledAvailabilityInputCellMarker,
} from "./styles";

const AvailabilityInputTime = React.memo(function AvailabilityInputTime({
  onMouseDown,
  onMouseOver,
  column,
  row,
  isSelected,
  isActive,
  isDisabled,
  label,
}) {
  const handleMouseDown = React.useCallback(() => {
    if (isDisabled) return;
    onMouseDown(column, row);
  }, [onMouseDown, column, row]);

  const handleMouseOver = React.useCallback(() => {
    onMouseOver(column, row);
  }, [onMouseOver, column, row]);

  return (
    <StyledAvailabilityInputCell
      role="button"
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      isSelected={isSelected}
      isActive={isActive}
      disabled={isDisabled}
      aria-label={label}
      aria-selected={isActive}
    >
      <StyledAvailabilityInputCellMarker>
        {isActive && !isSelected && (
          <Circle size={20} bg="cyan800" color="white.9">
            <Check size={12} strokeWidth={3} />
          </Circle>
        )}
      </StyledAvailabilityInputCellMarker>
    </StyledAvailabilityInputCell>
  );
});

export default AvailabilityInputTime;
