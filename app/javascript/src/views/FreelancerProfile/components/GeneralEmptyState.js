import React from "react";
import { Box, Text, theme } from "@advisable/donut";
import EmptyBoxIllustration from "src/illustrations/zest/emptybox";

export default function GeneralEmptyState({ specialist }) {
  return (
    <Box
      p={8}
      bg="white"
      border="2px solid"
      borderColor="neutral100"
      py={20}
      borderRadius="20px"
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        maxWidth="320px"
        marginX="auto"
        textAlign="center"
      >
        <EmptyBoxIllustration width="200px" color={theme.colors.blue300} />
        <Text
          fontWeight={500}
          marginBottom={0.5}
          marginTop={3}
          lineHeight="20px"
          color="neutral900"
        >
          Huh?! Seems like nothing to explore.
        </Text>
        <Text
          fontSize="sm"
          marginBottom={4}
          lineHeight="20px"
          color="neutral700"
        >
          It looks like {specialist.firstName} hasn&apos;t any projects to their
          profile yet.
        </Text>
      </Box>
    </Box>
  );
}
