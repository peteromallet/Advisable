import React from "react";
import { filter } from "lodash-es";
import { Text } from "@advisable/donut";
import TaskList from "../../components/TaskList";

const CompletedTasks = ({ isClient, application, onClick }) => {
  let tasks = filter(application.tasks, { stage: "Approved" });

  if (tasks.length === 0) {
    return (
      <Text padding="l" textAlign="center" size="xs" color="neutral.6">
        You have not completed any tasks
      </Text>
    );
  }

  return <TaskList tasks={tasks} isClient={isClient} onClickTask={onClick} />;
};

export default CompletedTasks;
