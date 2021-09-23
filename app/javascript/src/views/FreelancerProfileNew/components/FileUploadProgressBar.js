import React from "react";
import { Box, Text, theme } from "@advisable/donut";
import { AnimatePresence, motion } from "framer-motion";
import { rgba } from "polished";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
  from {
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(6px);
  }

  to {
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const BluredBackground = styled(Box)`
  animation: ${animation} 0.8s ease infinite alternate;
`;

const ProgressBar = styled(Box)`
  height: 2px;
  width: 180px;
  max-width: 60%;
  overflow: hidden;
  border-radius: 1px;
  background: ${theme.colors.blue100};
  box-shadow: 0 0 1px 0 ${rgba(theme.colors.neutral900, 0.3)};
`;

export default function FileUploadProgressBar({
  progress,
  uploading,
  processing,
  updated,
}) {
  return (
    <AnimatePresence>
      {(uploading || processing || updated === false) && (
        <BluredBackground
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          width="100%"
          height="100%"
          position="absolute"
          css={`
            clip-path: url(#passportSquircle);
          `}
        >
          <ProgressBar mt="s" mb="xs">
            <Box style={{ width: `${progress}%` }} height="100%" bg="blue500" />
          </ProgressBar>
          <Text fontSize="xxs" color="neutral800">
            {uploading && "Uploading"}
            {processing && "Processing"}
            {updated === false && "Displaying"}
          </Text>
        </BluredBackground>
      )}
    </AnimatePresence>
  );
}
