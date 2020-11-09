import React from "react";
import { Folder } from "@styled-icons/feather";
import { Circle, Box, Text, Button } from "@advisable/donut";
import { useHistory } from "react-router";

function NoProjects({ data, isOwner }) {
  const firstName = data.specialist.firstName;
  const history = useHistory();

  return (
    <Box textAlign="center" py="xxl">
      <Circle mb="m" bg="blue800" color="blue100">
        <Folder size={24} strokeWidth={2} />
      </Circle>
      <Text color="neutral900" fontWeight="medium" mb="xs">
        No Projects
      </Text>
      <Text color="neutral600">
        {firstName} has not added any previous projects yet
      </Text>
      {isOwner && (
        <Button
          variant="subtle"
          onClick={() => history.push("/settings/references")}
          mt="l"
        >
          Add Projects
        </Button>
      )}
    </Box>
  );
}

export default NoProjects;
