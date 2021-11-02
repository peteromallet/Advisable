import React from "react";
import { Text } from "@advisable/donut";
import { DateTime } from "luxon";
import {
  StyledAvailabilityInputHeader,
  StyledAvailabilityInputHeaderColumn,
} from "./styles";
import CircularButton from "../CircularButton";
import { ArrowSmLeft, ArrowSmRight } from "@styled-icons/heroicons-solid";

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
        <CircularButton
          disabled={!canGoBack}
          size="xs"
          icon={ArrowSmLeft}
          onClick={onPreviousWeek}
        />
      </StyledAvailabilityInputHeaderColumn>
      {days.map((day) => (
        <StyledAvailabilityInputHeaderColumn key={day}>
          <Text fontSize="13px" color="neutral500" fontWeight={600} mb={0.5}>
            {DateTime.fromISO(day).setZone(timezone).toFormat("dd")}
          </Text>
          <Text
            fontSize="12px"
            color="neutral900"
            fontWeight={600}
            textTransform="uppercase"
          >
            {DateTime.fromISO(day).setZone(timezone).toFormat("ccc")}
          </Text>
        </StyledAvailabilityInputHeaderColumn>
      ))}
      <StyledAvailabilityInputHeaderColumn>
        <CircularButton size="xs" icon={ArrowSmRight} onClick={onNextWeek} />
      </StyledAvailabilityInputHeaderColumn>
    </StyledAvailabilityInputHeader>
  );
});

export default AvailabilityInputHeader;
