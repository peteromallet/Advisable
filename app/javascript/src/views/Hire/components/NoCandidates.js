import React from "react";
import { Box, Text, theme } from "@advisable/donut";
import CalendarIllustration from "src/illustrations/zest/calendar";

export default function NoCandidates() {
  return (
    <Box
      maxWidth="520px"
      px={8}
      mx="auto"
      paddingTop={4}
      paddingBottom={8}
      textAlign="center"
    >
      <CalendarIllustration color={theme.colors.blue300} width="164px" />
      <Text
        fontSize="20px"
        fontWeight={600}
        marginBottom={2}
        marginTop={6}
        letterSpacing="-0.02rem"
      >
        No connections
      </Text>
      <Text lineHeight="20px" marginBottom={6}>
        You haven&apos;t connected with any freelancers yet. Once you connect
        with a freelancer you can hire them from here.
      </Text>
    </Box>
  );
}
