import React from "react";
import { Box, Text } from "@advisable/donut";
import StyledChevronInputOption, { Loading } from "./styles";
import { ChevronForward } from "@styled-icons/ionicons-outline/ChevronForward";

function ChevronButtonInput({
  value,
  options,
  alignWidth,
  size = "m",
  onSelect,
  loading,
}) {
  const handleClick = (value) => (e) => {
    onSelect(value);
    e.preventDefault();
    return;
  };

  return (
    <Box>
      <Box
        display="grid"
        gridTemplateColumns={`1, ${alignWidth ? "minmax(0, 1fr)" : "auto"})`}
        gridColumnGap={2}
        gridRowGap={2}
        css={loading && "cursor: wait;"}
      >
        {options.map((option) => (
          <StyledChevronInputOption
            size={size}
            type="submit"
            key={option.value}
            data-selected={value === option.value}
            data-submitting={loading}
            disabled={value !== option.value && loading}
            aria-label={option.label}
            onClick={handleClick(option.value)}
          >
            <Text
              as="span"
              fontSize={["xs", "m"]}
              fontWeight="light"
              lineHeight={["16px", "normal"]}
            >
              {option.label}
            </Text>
            <Box
              width="24px"
              height="24px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {loading && value === option.value ? (
                <Loading />
              ) : (
                <ChevronForward />
              )}
            </Box>
          </StyledChevronInputOption>
        ))}
      </Box>
    </Box>
  );
}

export default ChevronButtonInput;
