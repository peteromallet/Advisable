import React from "react";
import { Box, Circle, Icon } from "@advisable/donut";

function Ribbon() {
  return (
    <Box width={32} height={50} position="relative" color="neutral900">
      <Circle
        width={20}
        height={20}
        top="8px"
        left="6px"
        bg="neutral600"
        position="absolute"
      >
        <Icon width={14} icon="check" color="white.9" />
      </Circle>
      <svg width="32" height="49" fill="none" viewBox="0 0 32 49">
        <path
          fill="currentColor"
          d="M0 4a4 4 0 014-4h24a4 4 0 014 4v43.95a1 1 0 01-1.616.788L17.231 38.462a2 2 0 00-2.462 0L1.616 48.738A1 1 0 010 47.95V4z"
        ></path>
      </svg>
    </Box>
  );
}

export default Ribbon;
