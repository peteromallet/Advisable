import React from "react";
import { rgba } from "polished";
import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Text, Box, theme } from "@advisable/donut";
import { variant } from "styled-system";

const animation = keyframes`
  from {
    background: ${rgba(theme.colors.blue200, 0.45)};
    backdrop-filter: blur(6px);
  }

  to {
    backdrop-filter: blur(5px);
    background: ${rgba(theme.colors.blue200, 0.55)};
  }
`;

const type = variant({
  prop: "$type",
  variants: {
    avatar: {
      clipPath: "url(#passportSquircle)",
    },
    cover: {
      clipPath: "url(#coverSquircle)",
    },
  },
});

export const StyledProgressContainer = styled.div`
  ${type}
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  animation: ${animation} 0.8s ease infinite alternate;
`;

export const StyledProgressBar = styled.div`
  height: 2px;
  width: 180px;
  margin-top: 12px;
  margin-bottom: 8px;
  max-width: 60%;
  overflow: hidden;
  border-radius: 1px;
  background: ${theme.colors.blue100};
  box-shadow: 0 0 1px 0 ${rgba(theme.colors.neutral900, 0.3)};
`;

export default function ProgressBar({
  progress,
  uploading,
  processing,
  updated,
  type,
}) {
  return (
    <AnimatePresence>
      {(uploading || processing || updated === false) && (
        <StyledProgressContainer
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          $type={type}
        >
          <StyledProgressBar>
            <Box style={{ width: `${progress}%` }} height="100%" bg="blue500" />
          </StyledProgressBar>
          <Text fontSize="xxs" color="neutral800">
            {uploading && "Uploading"}
            {processing && "Processing"}
            {updated === false && "Displaying"}
          </Text>
        </StyledProgressContainer>
      )}
    </AnimatePresence>
  );
}
