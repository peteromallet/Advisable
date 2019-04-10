import * as React from "react";
import * as moment from "moment";
import { Task as TaskType } from "../../types";
import { Task, Title, Detail, Description } from "./styles";
import Icon from "../Icon";
import TaskStatus from "../TaskStatus";
import pluarlize from "../../utilities/pluralize";

interface Props {
  task: TaskType;
  hideStatus?: boolean;
  onClick: () => void;
}

export default ({ task, hideStatus, onClick }: Props) => {
  return (
    <Task onClick={onClick}>
      {!hideStatus && (
        <TaskStatus isClient={true}>{task.stage}</TaskStatus>
      )}
      <Title>{task.name || "Untitled"}</Title>
      {task.dueDate && (
        <Detail>
          <Icon height={17} icon="calendar" />
          <span>
            Due: <strong>{moment(task.dueDate).format("DD MMMM")}</strong>
          </span>
        </Detail>
      )}
      {task.estimate && (
        <Detail>
          <Icon height={17} icon="clock" />
          <span>
            Quote: <strong>{pluarlize(task.estimate, "hour", "hours")}</strong>
          </span>
        </Detail>
      )}
    </Task>
  );
};
