import * as React from "react";
import { Box, Text } from "@advisable/donut";
import NewTask from "../../components/NewTask";
import illustration from "./no_tasks.png";

function NoTasks({ onNewTask, application }) {
  const firstName = application.specialist?.firstName;

  return (
    <Box padding="xxl" textAlign="center">
      <img src={illustration} width={300} />

      {application.projectType === "Flexible" && (
        <Box maxWidth={450} mx="auto">
          <Text lineHeight="m" color="neutral.8">
            You are working with {firstName} on a Flexible basis. They will
            submit their hours worked at the end of each{" "}
            {application.billingCycle === "Monthly" ? "month" : "week"}.
          </Text>
        </Box>
      )}

      {application.projectType !== "Flexible" && (
        <Box maxWidth={450} mx="auto">
          <Text fontWeight="semibold" colour="blue.9" mb="xxs">
            No active projects
          </Text>
          <Text mb="l" fontSize="s" color="neutral.8">
            You must now assign a project in order for {firstName} to start
            work.
          </Text>
          <NewTask onCreate={onNewTask} application={application} />
        </Box>
      )}
    </Box>
  );
}

export default NoTasks;
