import React from "react";
import { Folder } from "@styled-icons/feather/Folder";
import { Circle, Box, Text, Button, DialogDisclosure } from "@advisable/donut";

function NoProjects({ data, isOwner, modal }) {
  const firstName = data.specialist.firstName;

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
      {isOwner ? (
        <DialogDisclosure as={Button} variant="subtle" mt={6} {...modal}>
          Add a Project
        </DialogDisclosure>
      ) : null}
    </Box>
  );
}

export default NoProjects;
