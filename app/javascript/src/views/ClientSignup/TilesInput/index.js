import React from "react";
import { Box } from "@advisable/donut";
import PropTypes from "prop-types";
import { StyledTilesInputOption } from "./styles";

function TilesInput({ onChange, value, options }) {
  const createClickHandler = (value) => () => onChange(value);
  const numberOfTiles = options.length;

  return (
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
            <Box width="32px" height="32px" mb="xs">
              <option.icon />
            </Box>
          )}
          {option.label}
        </StyledTilesInputOption>
      ))}
    </Box>
  );
}

TilesInput.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default TilesInput;
