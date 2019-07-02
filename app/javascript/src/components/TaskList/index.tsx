// Renders a list of given tasks.
import * as React from "react";
import { TaskList as Container, Row } from "./styles";
import Task from "./Task";

type Task = {
  id: string;
  stage: string;
  name?: string;
  createdAt: string;
};

type Props = {
  tasks: Task[];
  hideStatus?: boolean;
  lastRow?: React.ReactNode;
  isClient?: boolean;
  onClickTask: (task: Task) => void;
  showPromptForTask?: (task: Task) => boolean;
};

const TaskList = (props: Props) => {
  const tasks = props.tasks;

  const sorted = tasks.sort((a, b) => {
    const dateA = Date.parse(a.createdAt);
    const dateB = Date.parse(b.createdAt);
    return dateA - dateB;
  });

  return (
    <Container>
      {sorted.map(task => (
        <Task
          key={task.id}
          task={task}
          isClient={props.isClient}
          hideStatus={props.hideStatus}
          onClick={() => props.onClickTask(task)}
          showPromptForTask={props.showPromptForTask}
        />
      ))}
      {props.lastRow && <Row>{props.lastRow}</Row>}
    </Container>
  );
};

export default TaskList;
