import * as React from "react";
import * as moment from "moment";
import { Task as TaskType } from "../../types";
import { Task, Title, Detail, Description } from "./styles";
import Icon from "../Icon";
import Status from "../Status";
import LineClamp from "../LineClamp";
import pluarlize from "../../utilities/pluralize";

interface Props {
  task: TaskType;
  onClick: () => void;
}

export default ({ task, onClick }: Props) => {
  return (
    <Task onClick={onClick}>
      <Status>{task.status}</Status>
      <Title>{task.name}</Title>
      <Description>
        <LineClamp maxHeight={40}>{task.description}</LineClamp>
      </Description>
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
