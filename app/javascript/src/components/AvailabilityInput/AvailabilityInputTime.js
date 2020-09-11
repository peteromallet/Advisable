import React from "react";
import { DateTime } from "luxon";
import { Check, Phone } from "@styled-icons/feather";
import { Circle, Tooltip } from "@advisable/donut";
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
  time,
  event,
}) {
  const handleMouseDown = React.useCallback(() => {
    if (isDisabled) return;
    onMouseDown(column, row);
  }, [onMouseDown, column, row]);

  const handleMouseOver = React.useCallback(() => {
    onMouseOver(column, row);
  }, [onMouseOver, column, row]);

  const label = time.toFormat("d MMM yyyy, HH:mm");

  return (
    <StyledAvailabilityInputCell
      role="button"
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      isSelected={isSelected}
      isActive={isActive}
      disabled={isDisabled}
      hasEvent={Boolean(event)}
      aria-label={label}
      aria-selected={isActive}
    >
      <Tooltip content={event?.label}>
        <StyledAvailabilityInputCellMarker>
          {isActive && !event && !isSelected && (
            <Circle size={20} bg="cyan800" color="white">
              <Check size={12} strokeWidth={3} />
            </Circle>
          )}
          {event && !isSelected && (
            <Circle size={20} bg="cyan900" color="white">
              <Phone size={16} strokeWidth={0} fill="currentColor" />
            </Circle>
          )}
        </StyledAvailabilityInputCellMarker>
      </Tooltip>
    </StyledAvailabilityInputCell>
  );
});

export default AvailabilityInputTime;
