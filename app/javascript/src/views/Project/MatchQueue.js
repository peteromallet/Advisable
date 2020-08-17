import React from "react";
import styled from "styled-components";
import { Box } from "@advisable/donut";
import { AnimatePresence, motion } from "framer-motion";
import ApplicantScore from "./ApplicantScore";

const StyledMatch = styled(motion.div)`
  width: 100%;
  height: 240px;
  overflow: hidden;
  border-radius: 12px;
  background: #b5b8ca;
  position: absolute;
`;

const StyledMatchImage = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${(p) => p.$image});
`;

const ANIMATIONS = {
  0: {
    y: 0,
    scale: 1,
    zIndex: 4,
    opacity: 1,
    boxShadow: "0px 4px 24px -4px rgba(37, 38, 50, 0.12)",
  },
  1: {
    y: -20,
    scale: 0.9,
    zIndex: 3,
    opacity: 0.8,
  },
  2: {
    y: -40,
    scale: 0.8,
    zIndex: 2,
    opacity: 0.4,
  },
  default: {
    y: -72,
    scale: 0.7,
    zIndex: 1,
    opacity: 0,
  },
  initial: {
    y: -24,
    scale: 0.9,
    zIndex: 1,
  },
};

const IMAGE_ANIMATIONS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export default function MatchQueue({ matches }) {
  return (
    <Box position="relative" width="100%" height="240px" marginBottom="32px">
      <Box position="absolute" right="-12px" top="-12px" zIndex="5">
        <ApplicantScore score={matches[0].score} />
      </Box>
      <AnimatePresence>
        {matches.map((application, index) => {
          const animation = ANIMATIONS[index] || ANIMATIONS.default;
          const isTop = index === 0;

          return (
            <StyledMatch
              key={application.id}
              initial={{ ...ANIMATIONS.initial, zIndex: 5 - index }}
              animate={animation}
              exit={{ y: 24, scale: 1.1, opacity: 0, zIndex: 6 }}
              transition={{ duration: 0.2 }}
            >
              <StyledMatchImage
                initial="hidden"
                animate={isTop ? "visible" : "hidden"}
                variants={IMAGE_ANIMATIONS}
                $image={application.specialist.avatar}
              />
            </StyledMatch>
          );
        })}
      </AnimatePresence>
    </Box>
  );
}
