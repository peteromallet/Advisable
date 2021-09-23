import React from "react";
import { Box, Text } from "@advisable/donut";
import illustration from "src/illustrations/zest/candidate.svg";

export default function MoreResults() {
  return (
    <Box maxWidth="500px" px={8} paddingBottom={8} mx="auto" textAlign="center">
      <img src={illustration} width="132px" />
      <Text
        marginTop={5}
        fontSize="20px"
        marginBottom={2}
        fontWeight={600}
        letterSpacing="-0.02rem"
      >
        That’s all for now
      </Text>
      <Text lineHeight="20px">
        It looks like we don’t have any more recommendations for you at this
        time. We have hundred’s of case studies added every week and will let
        you know when we have another recommendation.
      </Text>
    </Box>
  );
}
