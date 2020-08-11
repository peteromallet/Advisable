import React, { useState } from "react";
import { Box, Text } from "@advisable/donut";
import styled from "styled-components";
import { theme } from "@advisable/donut";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  min-height: 48px;
  background-color: #eff0f3;
`;

const StyledScaleButton = styled.div`
  cursor: pointer;
  min-height: 48px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: inset -1px 0px 0px 0px ${theme.colors.neutral100};
  background-color: transparent;
  &[data-selected="true"] {
    box-shadow: inset 0px 0px 0px 0px ${theme.colors.neutral200};
  }
  &[data-hover-inrange="true"] {
    box-shadow: inset -1px 0px 0px 0px ${theme.colors.neutral200};
  }
  &[data-selected-inrange="true"] {
    box-shadow: inset -1px 0px 0px 0px ${theme.colors.blue900};
  }
  &[data-last="true"] {
    box-shadow: inset 0px 0px 0px 0px ${theme.colors.neutral200};
  }
`;

const StyledScaleIndicator = styled.div`
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  height: 48px;
  pointer-events: none;
  border-radius: 8px 0 0 8px;
  box-shadow: inset 0px 0px 0px 2px ${theme.colors.neutral200};
  ${Wrapper}:hover & {
    display: block;
  }
  &[data-last="true"] {
    border-radius: 8px;
  }
`;

const StyledDisplayValue = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${theme.colors.blue100};
  box-shadow: inset 0px 0px 0px 2px ${theme.colors.blue900};
  border-radius: 8px 0 0 8px;
  &[data-last="true"] {
    border-radius: 8px;
  }
`;

function ScaleInput({ onChange, value, options, importanceScale }) {
  const createClickHandler = (value) => () => onChange(value);
  const [hoverInd, setHoverInd] = useState(0);
  return (
    <Box
      as={Wrapper}
      position="relative"
      display="flex"
      minHeight="48px"
      alignItems="center"
      justifyContent="space-around"
      borderRadius="8px"
    >
      <Box
        as={StyledScaleIndicator}
        position="absolute"
        left="0"
        minHeight="48px"
        data-last={hoverInd === 5}
        width={`${hoverInd * 20}%`}
      />
      <Box
        as={StyledDisplayValue}
        width={`${Number(value) * 20}%`}
        data-last={value === 5}
        height="48px"
      />
      {[1, 2, 3, 4, 5].map((num, index) => (
        <Box
          as={StyledScaleButton}
          key={num}
          width="100%"
          textAlign="center"
          minHeight="48px"
          aria-label={num}
          data-selected={value === num}
          data-hover={num === hoverInd}
          data-last={num === 5}
          data-selected-inrange={num <= value}
          data-hover-inrange={num <= hoverInd}
          onMouseOver={() => setHoverInd(num)}
          onMouseLeave={() => setHoverInd(0)}
          onClick={createClickHandler(num)}
          zIndex="2"
        >
          <Text
            lineHeight="48px"
            fontSize="xxs"
            fontWeight="light"
            color="neutral400"
          >
            {index === 0 && "least"}
            {index === 4 && "most"}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

ScaleInput.propTypes = {};

export default ScaleInput;
