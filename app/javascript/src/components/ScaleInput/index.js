import React from "react";
import { Box, Text } from "@advisable/donut";
import { StyledScaleInput, StyledScaleInputOption } from "./styles";

const LABELS = [
  "Very Unlikely",
  "Unlikely",
  "Not Sure",
  "Likely",
  "Very Likely",
];

function ScaleInput({
  value,
  onChange,
  leftTitle,
  rightTitle,
  labels = LABELS,
}) {
  const createClickHandler = (value) => () => {
    onChange(value);
  };

  return (
    <StyledScaleInput>
      <Box
        display="grid"
        gridTemplateColumns="repeat(5, auto)"
        gridColumnGap="8px"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <StyledScaleInputOption
            key={n}
            type="button"
            aria-label={labels[n - 1]}
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
          {leftTitle || "Unlikely"}
        </Text>
        <Text
          fontSize="s"
          color="neutral.7"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          {rightTitle || "Very Likely"}
        </Text>
      </Box>
    </StyledScaleInput>
  );
}

export default ScaleInput;
