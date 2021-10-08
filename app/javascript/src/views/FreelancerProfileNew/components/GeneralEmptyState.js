import React from "react";
import { Box, Text, theme } from "@advisable/donut";
import EmptyBoxIllustration from "src/illustrations/zest/emptybox";

export default function GeneralEmptyState({ specialist }) {
  return (
    <Box p={8}>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        maxWidth="320px"
        marginX="auto"
        textAlign="center"
      >
        <EmptyBoxIllustration width="112px" color={theme.colors.neutral300} />
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
          Come back later when {specialist.firstName} update their profile with
          some content.
        </Text>
      </Box>
    </Box>
  );
}
