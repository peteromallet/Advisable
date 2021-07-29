import React from "react";
import { Box, Heading, Text } from "@advisable/donut";
import island from "src/illustrations/island.svg";

export default function ExplorerEmptyView() {
  return (
    <Box
      mx="auto"
      paddingX={2}
      paddingTop={20}
      paddingBottom={6}
      maxWidth="600px"
      textAlign="center"
    >
      <Box as="img" maxWidth="320px" marginBottom={6} src={island} />
      <Heading size="lg" marginBottom={1} fontWeight={550}>
        You have no projects
      </Heading>
      <Text color="neutral700">
        Any talent you discover and engage with will appear here
      </Text>
    </Box>
  );
}
