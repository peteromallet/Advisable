import React from "react";
import Box from "../Box";
import Text from "../Text";
import Circle from "../Circle";
import { StyledAvailabilityDay } from "./styles";

const AvailabilityDay = ({ date, style, availability, onClick }) => {
  const dayOfWeek = date.toFormat("EEEE");
  const isWeekend = dayOfWeek === "Saturday" || dayOfWeek === "Sunday";
  const isWeekday = !isWeekend;

  const handleClick = () => {
    onClick(date);
  };

  const hasAvailability = availability.length > 0;

  return (
    <Box style={style}>
      <StyledAvailabilityDay
        disabled={isWeekend}
        aria-label={`Set availability for ${date.toFormat(
          "EEEE, dd MMMM YYYY"
        )}`}
        hasAvailability={hasAvailability}
        onClick={isWeekday ? handleClick : null}
      >
        <Text fontSize="xs" color="neutral.7" mb="xxs">
          {date.toFormat("EEE")}
        </Text>
        <Text fontSize="l" fontWeight="medium" color="blue.8">
          {date.toFormat("dd")}
        </Text>
        {hasAvailability && (
          <Circle mt="12px" width={6} height={6} bg="blue.5" />
        )}
      </StyledAvailabilityDay>
    </Box>
  );
};

export default AvailabilityDay;
