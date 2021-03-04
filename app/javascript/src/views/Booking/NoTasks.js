import * as React from "react";
import { get } from "lodash-es";
import { Box, Text, Card } from "@advisable/donut";
import NewTask from "../../components/NewTask";
import illustration from "./no_tasks.png";

export default function NoTasks({ onNewTask, application }) {
  let firstName = get(application, "specialist.firstName");

  return (
    <Card>
      <Box padding="xxl" style={{ textAlign: "center" }}>
        <img src={illustration} width={300} />
        <Box paddingBottom="xs">
          <Text weight="semibold" colour="dark">
            No active projects
          </Text>
        </Box>
        <Box paddingBottom="l" maxWidth="300px" margin="0 auto">
          <Text fontSize="sm">
            You must now assign a project in order for {firstName} to start
            work.
          </Text>
        </Box>
        <NewTask onCreate={onNewTask} application={application} />
      </Box>
    </Card>
  );
}
