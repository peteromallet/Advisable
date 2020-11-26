import React from "react";
import { Card, Text, Box } from "@advisable/donut";
import { Redirect } from "react-router";
import useViewer from "src/hooks/useViewer";
import TeamMembers from "./TeamMembers";

export default function Team() {
  const viewer = useViewer();

  if (!viewer.isTeamManager) {
    return <Redirect to="/settings" />;
  }

  return (
    <Card padding="10">
      <Text
        fontSize="3xl"
        marginBottom="5"
        fontWeight="medium"
        color="neutral900"
        letterSpacing="-0.02rem"
      >
        Team
      </Text>
      <Box height="1px" bg="neutral100" />
      <Box pt="3" pb="2" display="grid" gridTemplateColumns="3fr 1fr">
        <Text fontSize="11px" color="neutral700" textTransform="uppercase">
          Team Member
        </Text>
        <Text fontSize="11px" color="neutral700" textTransform="uppercase">
          Role
        </Text>
      </Box>
      <Box height="1px" bg="neutral100" />
      <TeamMembers />
    </Card>
  );
}
