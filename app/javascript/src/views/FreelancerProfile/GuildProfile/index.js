import React from "react";
import { Card, Box, Text } from "@advisable/donut";
import Posts from "./Posts";

export default function GuildProfile() {
  return (
    <Box display="flex">
      <Box width="280px" flexShrink="0" paddingRight="xl">
        <Card padding="lg">Actions</Card>
      </Box>
      <Box width="100%">
        <Text fontSize="l" fontWeight="medium" marginBottom="md">
          Posts
        </Text>
        <Posts />
      </Box>
    </Box>
  );
}
