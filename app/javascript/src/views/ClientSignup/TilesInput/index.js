import React from "react";
import { Box, Text } from "@advisable/donut";
import PropTypes from "prop-types";
import { StyledTilesInputOption } from "./styles";

function TilesInput({ onChange, value, options, importanceScale }) {
  const createClickHandler = (value) => () => onChange(value);
  const numberOfTiles = options.length;

  const importanceScaleLabels = (
    <Box display="flex" pt="xxs">
      <Text fontSize="xxs" color="neutral300" fontWeight="light">
        not important
      </Text>
      <Text fontSize="xxs" color="neutral300" fontWeight="light" ml="auto">
        very important
      </Text>
    </Box>
  );

  return (
    <Box>
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${numberOfTiles}, auto)`}
        gridColumnGap="8px"
      >
        {options.map((option) => (
          <StyledTilesInputOption
            key={option.value}
            type="button"
            data-selected={value === option.value}
            aria-label={option.label}
            onClick={createClickHandler(option.value)}
          >
            {option.icon && (
              <Box width="32px" height="32px" mb="xxs">
                <option.icon />
              </Box>
            )}
            <Text fontSize="xs" color="neutral500" fontWeight="light">
              {option.label}
            </Text>
          </StyledTilesInputOption>
        ))}
      </Box>
      {importanceScale && importanceScaleLabels}
    </Box>
  );
}

TilesInput.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string,
  importanceScale: PropTypes.bool,
};

export default TilesInput;
