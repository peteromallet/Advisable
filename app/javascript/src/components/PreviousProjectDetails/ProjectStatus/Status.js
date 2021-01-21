import React from "react";
import { Box, Circle } from "@advisable/donut";
import {
  StatusWrapper,
  StyledBadge,
  StyledMessage,
  StyledTitle,
} from "./styles";

function Status({ CTA, ...props }) {
  return (
    <StatusWrapper>
      <StyledBadge variant={props.variant} prefix={props.icon}>
        <Box display="flex" p={3}>
          <Box>
            <Circle size={40} mr={3}>
              {props.icon}
            </Circle>
          </Box>
          <Box>
            <StyledTitle
              mb={0.5}
              fontSize="md"
              fontWeight="medium"
              lineHeight="m"
            >
              {props.label}
            </StyledTitle>
            <StyledMessage fontSize="sm" lineHeight="xs">
              {props.message}
            </StyledMessage>
            {CTA && <CTA {...props} />}
          </Box>
        </Box>
      </StyledBadge>
    </StatusWrapper>
  );
}

export default Status;
