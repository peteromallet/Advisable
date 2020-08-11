import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Text, useBreakpoint } from "@advisable/donut";
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
  /* text-transform: uppercase; */
  box-sizing: border-box;
  letter-spacing: 1px;
  background-color: transparent;
  border-style: solid;
  border-color: ${theme.colors.neutral100};
  border-width: 0 1px 0 0;

  &[data-last="true"] {
    border-width: 0;
    border-radius: 0 8px 8px 0;
  }
  &[data-first="true"] {
    border-radius: 8px 0 0 8px;
  }

  /* hover borders */
  &:hover {
    border-width: 2px 2px 2px 0;
    border-color: ${theme.colors.neutral200};
  }
  &:hover[data-first="true"] {
    border-width: 2px;
  }
  /* inrange hover border */
  ${Wrapper}:hover &[data-hover-inrange="true"][data-selected="false"] {
    border-width: 2px 1px 2px 0;
    border-color: ${theme.colors.neutral200};
  }
  ${Wrapper}:hover &[data-hover-inrange="true"][data-selected-inrange="true"] {
    border-color: ${theme.colors.blue900};
  }
  ${Wrapper}:hover &[data-hover-inrange="true"][data-selected="false"][data-first="true"] {
    border-width: 2px 1px 2px 2px;
  }

  /* selected borders */
  &[data-selected="true"] {
    background-color: ${theme.colors.blue100};
    border-width: 2px 2px 2px 0;
    border-color: ${theme.colors.blue900};
  }
  &[data-selected="true"][data-first="true"] {
    border-width: 2px;
    border-color: ${theme.colors.blue900};
  }
  &[data-selected-inrange="true"] {
    background-color: ${theme.colors.blue100};
    border-width: 2px 1px 2px 0;
    border-color: ${theme.colors.blue900};
  }
  &[data-selected="true"] {
    border-width: 2px 2px 2px 0;
    border-color: ${theme.colors.blue900};
  }
  &[data-selected-inrange="true"][data-first="true"] {
    border-width: 2px 1px 2px 2px;
    border-color: ${theme.colors.blue900};
  }
`;

function ScaleInput({ onChange, value }) {
  const createClickHandler = (value) => () => onChange(value);
  const isMobile = useBreakpoint("s");
  const [hoverInd, setHoverInd] = useState(0);
  return (
    <Box>
      <Box
        as={Wrapper}
        alignItems="center"
        justifyContent="space-around"
        borderRadius="8px"
      >
        {[1, 2, 3, 4, 5].map((num, index) => (
          <Box
            key={num}
            position="relative"
            display="inline-block"
            width="100%"
          >
            <Box
              as={StyledScaleButton}
              display="flex"
              alignItems="center"
              justifyContent="center"
              textAlign="left"
              key={num}
              width="100%"
              minHeight="48px"
              aria-label={num}
              data-last={num === 5}
              data-first={num === 1}
              data-selected={value === num}
              data-selected-inrange={num < value}
              data-hover-inrange={num < hoverInd}
              onMouseOver={() => setHoverInd(num)}
              onClick={createClickHandler(num)}
              zIndex="2"
            >
              <Box
                position="absolute"
                left="0"
                top="0"
                right="0"
                bottom="0"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {isMobile ? (
                  <Text px="xxs" fontSize="xxs" color="neutral400">
                    {index === 0 && "least"}
                    {index === 4 && "most"}
                  </Text>
                ) : (
                  <Text px="xxs" fontSize="xxs" color="neutral400">
                    {index === 0 && "not important"}
                    {index === 4 && "very important"}
                  </Text>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

ScaleInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
};

export default ScaleInput;
