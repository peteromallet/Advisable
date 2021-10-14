import React from "react";
import { Box, Text, theme } from "@advisable/donut";
import MessagesIllustration from "src/illustrations/zest/messages";

export default function NoConversations() {
  return (
    <Box
      mx="auto"
      display="flex"
      height="100%"
      maxWidth="400px"
      textAlign="center"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <MessagesIllustration
        width="200px"
        marginBottom={6}
        color={theme.colors.orange300}
      />
      <Text
        fontSize="lg"
        fontWeight={550}
        marginBottom={1}
        color="neutral900"
        letterSpacing="-0.02em"
      >
        No messages
      </Text>
      <Text color="neutral600">You don&apos;t have any messages yet.</Text>
    </Box>
  );
}
