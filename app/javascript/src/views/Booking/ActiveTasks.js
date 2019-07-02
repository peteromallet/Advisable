import React from "react";
import { filter } from "lodash";
import NoTasks from "./NoTasks";
import NewTask from "../../components/NewTask";
import TaskList from "../../components/TaskList";

const ActiveTasks = ({ onSelectTask, onNewTask, application }) => {
  let tasks = filter(application.tasks, t => t.stage !== "Approved");

  if (tasks.length === 0) {
    return <NoTasks onNewTask={onNewTask} application={application} />;
  }

  return (
    <TaskList
      isClient
      tasks={tasks}
      onClickTask={onSelectTask}
      lastRow={<NewTask onCreate={onNewTask} application={application} />}
    />
  );
};

export default ActiveTasks;
