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
  onClickTask: (task: Task) => void;
};

const TaskList = (props: Props) => {
  const sorted = props.tasks.sort((a, b) => {
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
          hideStatus={props.hideStatus}
          onClick={() => props.onClickTask(task)}
        />
      ))}
      {props.lastRow && <Row>{props.lastRow}</Row>}
    </Container>
  );
};

export default TaskList;
