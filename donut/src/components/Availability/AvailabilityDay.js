import React from "react";
import { format } from "date-fns";
import Box from "../Box";
import Text from "../Text";
import Circle from "../Circle";
import { StyledAvailabilityDay } from "./styles";

const AvailabilityDay = ({ date, style, availability, onClick }) => {
  const handleClick = () => {
    onClick(date);
  };

  const hasAvailability = availability.length > 0;

  return (
    <Box style={style}>
      <StyledAvailabilityDay
        onClick={handleClick}
        hasAvailability={hasAvailability}
      >
        <Text fontSize="xs" color="neutral.7" mb="xxs">
          {format(date, "EEEEEE")}
        </Text>
        <Text fontSize="l" fontWeight="medium" color="blue.8">
          {format(date, "dd")}
        </Text>
        {hasAvailability && (
          <Circle mt="12px" width={6} height={6} bg="blue.5" />
        )}
      </StyledAvailabilityDay>
    </Box>
  );
};

export default AvailabilityDay;
