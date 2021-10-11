import React from "react";
import { Box, Text } from "@advisable/donut";
import css from "@styled-system/css";
import QuoteIcon from "./QuoteIcon";

export default function AdvisableComment({ children }) {
  return (
    <Box position="relative" paddingRight={5}>
      <Text fontWeight={450} mb={1.5} color="neutral700" fontSize="sm">
        Comment from The Advisable Team
      </Text>
      <Box
        css={`
          transform: rotate(-0.4deg);
        `}
      >
        <Text
          fontSize="xl"
          fontWeight={450}
          lineHeight="32px"
          display="inline"
          paddingX={1}
          css={css({
            background: "#FFEDC9",
          })}
        >
          {children}
        </Text>
      </Box>
      <Box position="absolute" right="0" top={1}>
        <QuoteIcon />
      </Box>
    </Box>
  );
}
