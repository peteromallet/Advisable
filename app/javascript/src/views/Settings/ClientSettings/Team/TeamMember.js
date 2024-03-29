import React from "react";
import useViewer from "src/hooks/useViewer";
import { useNotifications } from "src/components/Notifications";
import { Box, Text, Toggle } from "@advisable/donut";
import { useToggleTeamManager } from "./queries";
import RemoveTeamMember from "./RemoveTeamMember";

export default function TeamMember({ member }) {
  const viewer = useViewer();
  const { notify } = useNotifications();
  const [toggle] = useToggleTeamManager();

  const handleToggleManager = async () => {
    await toggle({
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

    if (member.isTeamManager) {
      notify(`${member.name} has been demoted`);
    } else {
      notify(`${member.name} has been promoted to manager`);
    }
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
        {member.id !== viewer.id && (
          <Box display="flex" alignItems="center">
            <Toggle
              label={
                member.isTeamManager
                  ? `Demote ${member.name}`
                  : `Promote ${member.name} to manager`
              }
              value={member.isTeamManager}
              onChange={handleToggleManager}
            />
            <Box ml={2}>
              <RemoveTeamMember member={member} />
            </Box>
          </Box>
        )}
      </Box>
      <Box height="1px" bg="neutral100" />
    </>
  );
}
