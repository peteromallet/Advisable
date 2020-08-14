import React from "react";
import { Box, Text } from "@advisable/donut";
import PropTypes from "prop-types";
import { StyledTilesInputOption } from "./styles";

function TilesInput({ onChange, value, options, importanceScale, alignWidth }) {
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
        gridTemplateColumns={`repeat(${numberOfTiles}, ${
          alignWidth ? "minmax(0, 1fr)" : "auto"
        })`}
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
              <Box width="32px" height="32px" mt="xxs" mb="xs">
                <option.icon strokeWidth={1.3} />
              </Box>
            )}
            <Text as="span" fontSize="xs">
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  importanceScale: PropTypes.bool,
  alignWidth: PropTypes.bool,
};

export default TilesInput;
