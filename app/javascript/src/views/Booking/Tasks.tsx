import * as React from "react";
import Card from "../../components/Card";
import Task from "../../components/Task";
import Heading from "../../components/Heading";
import Divider from "../../components/Divider";
import NewTask from "../../components/NewTask";
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

  const sorted = tasks.sort((a, b) => {
    const dateA = Date.parse(a.createdAt)
    const dateB = Date.parse(b.createdAt)
    return dateA - dateB
  })

  return (
    <Card>
      <Padding size="l">
        <Heading level={3}>Active Tasks</Heading>
      </Padding>
      <Divider />
      {sorted.map(task => (
        <Task key={task.id} task={task} onClick={() => onSelectTask(task)} />
      ))}
      <Padding size="l">
        <NewTask onClick={onNewTask} />
      </Padding>
    </Card>
  );
};
