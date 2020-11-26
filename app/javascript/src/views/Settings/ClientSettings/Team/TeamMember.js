import React from "react";
import { Box, Text } from "@advisable/donut";

export default function TeamMember({ member }) {
  return (
    <>
      <Box
        height="60px"
        display="grid"
        alignItems="center"
        gridTemplateColumns="3fr 1fr"
      >
        <Box>
          <Text fontSize="md" color="neutral900" mb={0.5}>
            {member.name}
          </Text>
          <Text fontSize="sm" color="neutral600">
            {member.email}
          </Text>
        </Box>
        <Text fontSize="sm" color="neutral800">
          {member.isTeamManager ? "Manager" : "Member"}
        </Text>
      </Box>
      <Box height="1px" bg="neutral100" />
    </>
  );
}
