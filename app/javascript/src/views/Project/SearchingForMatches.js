import React from "react";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { theme, Box, Text, Paragraph } from "@advisable/donut";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
`;

const StyledQueue = styled.div`
  width: 200px;
  height: 140px;
  margin: 0 auto;
  position: relative;
  margin-bottom: 32px;
`;

const StyledQueueCard = styled.div`
  width: 200px;
  height: 140px;
  position: absolute;
  border-radius: 12px;
  top: 0;
  left: 50%;
  margin-left: -100px;
  background: ${theme.colors.neutral200};

  &:nth-child(1) {
    z-index: 1;
  }

  &:nth-child(2) {
    z-index: 2;
  }

  &:nth-child(3) {
    z-index: 3;
  }

  &:nth-child(4) {
    z-index: 4;
  }
`;

export default function SearchingForMatches() {
  return (
    <StyledContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Box width="100%" maxWidth="400px" marginX="auto">
          <StyledQueue>
            <StyledQueueCard
              as={motion.div}
              initial={{ scale: 0.7, y: -48, opacity: 0 }}
              animate={{ y: -32, scale: 0.8, opacity: 0.2 }}
              transition={{ repeat: Infinity, duration: 1, repeatDelay: 0.5 }}
            />
            <StyledQueueCard
              as={motion.div}
              initial={{ scale: 0.8, y: -32, opacity: 0.2 }}
              animate={{ y: -16, scale: 0.9, opacity: 0.6 }}
              transition={{ repeat: Infinity, duration: 1, repeatDelay: 0.5 }}
            />
            <StyledQueueCard
              as={motion.div}
              initial={{ scale: 0.9, y: -16, opacity: 0.6 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1, repeatDelay: 0.5 }}
            />
            <StyledQueueCard
              as={motion.div}
              initial={{ scale: 1, y: 0, opacity: 1 }}
              animate={{ y: 16, scale: 1.1, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1, repeatDelay: 0.5 }}
            />
          </StyledQueue>
          <Text
            marginBottom="12px"
            fontWeight="medium"
            fontSize="18px"
            textAlign="center"
          >
            Searching for candidates
          </Text>
          <Paragraph size="sm" textAlign="center">
            We are currently searching for suitable freelancers. This may take
            up to 24 hours. We will notify you once we have found someone.
          </Paragraph>
        </Box>
      </motion.div>
    </StyledContainer>
  );
}
