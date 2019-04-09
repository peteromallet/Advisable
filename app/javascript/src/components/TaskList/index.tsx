import * as React from "react";
import { TaskList as Container, Row } from "./styles";
import Task from "./Task";
import NewTask from "../NewTask";

type Task = {
  id: string;
  stage: string;
  name?: string;
  createdAt: string;
};

type Props = {
  tasks: Task[];
  bookingId: string;
  onNewTask: (task: any) => void;
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
          onClick={() => props.onClickTask(task)}
        />
      ))}
      <Row>
        <NewTask
          onCreate={props.onNewTask}
          bookingId={props.bookingId}
        />
      </Row>
    </Container>
  );
};

export default TaskList;
