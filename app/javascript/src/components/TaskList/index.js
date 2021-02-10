// Renders a list of given tasks.
import React from "react";
import { TaskList as Container, Row } from "./styles";
import Task from "./Task";

const TaskList = (props) => {
  const tasks = props.tasks;

  const sorted = tasks.slice().sort((a, b) => {
    const dateA = Date.parse(a.createdAt);
    const dateB = Date.parse(b.createdAt);
    return dateA - dateB;
  });

  return (
    <Container>
      {sorted.map((task) => (
        <Task
          key={task.id}
          task={task}
          notice={props.notice(task)}
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

TaskList.defaultProps = {
  notice: () => {},
};

export default TaskList;
