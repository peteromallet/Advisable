import * as React from "react";
import Card from "../../components/Card";
import TaskList from "../../components/TaskList";
import Heading from "../../components/Heading";
import Divider from "../../components/Divider";
import { Padding } from "../../components/Spacing";
import NoTasks from "./NoTasks";

export default ({ tasks, firstName, onNewTask, onSelectTask }) => {
  if (tasks.length === 0) {
    return (
      <NoTasks
        tasks={tasks}
        firstName={firstName}
        onNewTask={onNewTask}
      />
    );
  }

  return (
    <Card>
      <Padding size="l">
        <Heading level={3}>Active Tasks</Heading>
      </Padding>
      <Divider />
      <TaskList tasks={tasks} onNewTask={onNewTask} onClickTask={onSelectTask} />
    </Card>
  );
};
