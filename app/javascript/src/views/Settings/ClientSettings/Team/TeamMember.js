import React from "react";
import useViewer from "src/hooks/useViewer";
import { Box, Text, Toggle } from "@advisable/donut";
import { useToggleTeamManager } from "./queries";

export default function TeamMember({ member }) {
  const viewer = useViewer();
  const [toggle] = useToggleTeamManager();

  const handleToggleManager = () => {
    toggle({
      variables: {
        input: {
          userId: member.id,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        toggleTeamManager: {
          __typename: "ToggleTeamManagerPayload",
          user: {
            ...member,
            isTeamManager: !member.isTeamManager,
          },
        },
      },
    });
  };

  return (
    <>
      <Box
        height="60px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
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
          <Toggle
            value={member.isTeamManager}
            onChange={handleToggleManager}
            disabled={member.id === viewer.id}
          />
        </Text>
      </Box>
      <Box height="1px" bg="neutral100" />
    </>
  );
}
