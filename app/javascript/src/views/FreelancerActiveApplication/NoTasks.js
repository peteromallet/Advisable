import React from "react";
import { Box, Card, Text } from "@advisable/donut";
import NewTask from "../../components/NewTask";
import illustration from "../../illustrations/relax.png";

export default function NoTasks({ onNewTask, application }) {
  return (
    <Card>
      <Box padding="xxl" style={{ textAlign: "center" }}>
        <img src={illustration} width={300} />
        <Box paddingBottom="xs">
          <Text weight="semibold" colour="dark">
            No active tasks
          </Text>
        </Box>
        <Box paddingBottom="l" maxWidth="300px" margin="0 auto">
          <Text fontSize="sm">
            You have no active tasks with {application.project.user.companyName}
            .
          </Text>
        </Box>
        <NewTask onCreate={onNewTask} application={application} />
      </Box>
    </Card>
  );
}
