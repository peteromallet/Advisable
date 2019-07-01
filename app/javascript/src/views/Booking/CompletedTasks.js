import React from "react";
import { filter } from "lodash";
import { Text } from "@advisable/donut";
import TaskList from "../../components/TaskList";

const CompletedTasks = ({ onSelectTask, application }) => {
  let tasks = filter(application.tasks, t => t.stage === "Approved");

  if (tasks.length === 0) {
    return (
      <Text padding="l" textAlign="center" size="xs" color="neutral.6">
        You have not completed any tasks
      </Text>
    );
  }

  return <TaskList isClient tasks={tasks} onClickTask={onSelectTask} />;
};

export default CompletedTasks;
