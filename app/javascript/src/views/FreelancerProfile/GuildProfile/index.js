import React from "react";
import { Box, Text } from "@advisable/donut";
import Posts from "./Posts";

export default function GuildProfile() {
  return (
    <Box>
      <Text fontSize="l" fontWeight="medium" marginBottom="md">
        Posts
      </Text>
      <Posts />
    </Box>
  );
}
