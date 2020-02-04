import React from "react";
import { Box, Text } from "@advisable/donut";
import { StyledScaleInput, StyledScaleInputOption } from "./styles";

function ScaleInput({ value, onChange }) {
  const createClickHandler = value => () => {
    onChange(value);
  };

  return (
    <StyledScaleInput>
      <Box display="flex">
        {[1, 2, 3, 4, 5].map(n => (
          <StyledScaleInputOption
            key={n}
            type="button"
            aria-label={n}
            data-selected={value === n}
            onClick={createClickHandler(n)}
          >
            {n}
          </StyledScaleInputOption>
        ))}
      </Box>
      <Box pt="xs" display="flex" justifyContent="space-between">
        <Text
          fontSize="s"
          color="neutral.7"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          Unlikely
        </Text>
        <Text
          fontSize="s"
          color="neutral.7"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          Very Likely
        </Text>
      </Box>
    </StyledScaleInput>
  );
}

export default ScaleInput;
