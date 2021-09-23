import React from "react";
import { Box, Text } from "@advisable/donut";
import illustration from "src/illustrations/zest/search.svg";

export default function MoreResults() {
  return (
    <Box maxWidth="520px" px={8} paddingBottom={8} mx="auto" textAlign="center">
      <img src={illustration} width="164px" />
      <Text
        fontSize="20px"
        fontWeight={600}
        marginBottom={2}
        marginTop="-8px"
        letterSpacing="-0.02rem"
      >
        Looking for more recommendations?
      </Text>
      <Text lineHeight="20px">
        In order to help you find the best candidate, we only show you five
        specialist’s at a time. When you remove a recommendation we will use
        your feedback to find you another one.
      </Text>
    </Box>
  );
}
