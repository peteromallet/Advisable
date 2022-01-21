import React from "react";
import { InformationCircle } from "@styled-icons/ionicons-outline/InformationCircle";
import { Card, Text, Box, Tooltip } from "@advisable/donut";
import { Navigate } from "react-router";
import useViewer from "src/hooks/useViewer";
import TeamMembers from "./TeamMembers";

export default function Team() {
  const viewer = useViewer();

  if (!viewer.isTeamManager) {
    return <Navigate to="/settings" />;
  }

  return (
    <Card padding={10} borderRadius="12px">
      <Text
        marginBottom={5}
        fontSize="3xl"
        fontWeight="medium"
        color="neutral900"
        letterSpacing="-0.02rem"
      >
        Team
      </Text>
      <Box height="1px" bg="neutral100" />
      <Box
        py="3"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="11px" color="neutral700" textTransform="uppercase">
          Team Member
        </Text>
        <Box display="flex" alignItems="center">
          <Text
            mr={1}
            fontSize="11px"
            color="neutral700"
            textTransform="uppercase"
          >
            Manager
          </Text>
          <Tooltip content="Managers have permission to invite other team members and manage company settings">
            <Box color="neutral500" marginTop="-3px">
              <InformationCircle size={16} />
            </Box>
          </Tooltip>
        </Box>
      </Box>
      <Box height="1px" bg="neutral100" />
      <TeamMembers />
    </Card>
  );
}
