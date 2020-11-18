import React from "react";
import { Box, Text } from "@advisable/donut";

export default function NoPosts({ specialist }) {
  return (
    <Box textAlign="center">
      <Text fontWeight="medium" fontSize="l" marginBottom="sm">
        No Posts
      </Text>
      <Text>{specialist.firstName} has not posted any guild posts yet.</Text>
    </Box>
  );
}
