import React from "react";
import { Box, Card } from "@advisable/donut";
import Text from "../../components/Text";
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
        <Box paddingBottom="l">
          <Text
            size="s"
            style={{
              maxWidth: "300px",
              margin: "0 auto",
            }}
          >
            You have no active tasks with {application.project.user.companyName}
            .
          </Text>
        </Box>
        <NewTask onCreate={onNewTask} application={application} />
      </Box>
    </Card>
  );
}
