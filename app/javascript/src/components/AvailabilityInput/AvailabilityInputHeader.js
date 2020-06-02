import React from "react";
import { ChevronLeft, ChevronRight } from "@styled-icons/feather";
import { Text } from "@advisable/donut";
import { DateTime } from "luxon";
import {
  StyledAvailabilityInputHeader,
  StyledAvailabilityInputHeaderColumn,
  StyledAvailabilityInputHeaderButton,
} from "./styles";

const AvailabilityInputHeader = React.memo(function AvailabilityInputHeader({
  times,
  timezone,
  onPreviousWeek,
  onNextWeek,
  canGoBack,
}) {
  const days = times.map((day) => day[0].time);

  return (
    <StyledAvailabilityInputHeader>
      <StyledAvailabilityInputHeaderColumn>
        <StyledAvailabilityInputHeaderButton
          type="button"
          disabled={!canGoBack}
          onClick={onPreviousWeek}
          aria-label="Previous week"
        >
          <ChevronLeft />
        </StyledAvailabilityInputHeaderButton>
      </StyledAvailabilityInputHeaderColumn>
      {days.map((day) => (
        <StyledAvailabilityInputHeaderColumn key={day}>
          <Text fontSize="15px" color="blue900" fontWeight="medium" mb="2px">
            {DateTime.fromISO(day).setZone(timezone).toFormat("ccc")}
          </Text>
          <Text fontSize="13px" color="neutral600">
            {DateTime.fromISO(day).setZone(timezone).toFormat("dd MMM")}
          </Text>
        </StyledAvailabilityInputHeaderColumn>
      ))}
      <StyledAvailabilityInputHeaderColumn>
        <StyledAvailabilityInputHeaderButton
          type="button"
          onClick={onNextWeek}
          aria-label="Next week"
        >
          <ChevronRight />
        </StyledAvailabilityInputHeaderButton>
      </StyledAvailabilityInputHeaderColumn>
    </StyledAvailabilityInputHeader>
  );
});

export default AvailabilityInputHeader;
