import * as React from "react";
import * as moment from "moment";
import { Task as TaskType } from "../../types";
import { Task, Title, Detail, TaskContent } from "./styles";
import Icon from "../Icon";
import TaskStatus from "../TaskStatus";
import pluarlize from "../../utilities/pluralize";
import Prompt from "./Prompt";

interface Props {
  task: TaskType;
  isClient?: boolean;
  onClick: () => void;
  hideStatus?: boolean;
}

export default ({ task, hideStatus, onClick, isClient }: Props) => {
  return (
    <Task onClick={onClick}>
      <Prompt task={task} isClient={isClient} />
      <TaskContent>
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
              Quote:{" "}
              <strong>{pluarlize(task.estimate, "hour", "hours")}</strong>
            </span>
          </Detail>
        )}
      </TaskContent>
      {!hideStatus && <TaskStatus isClient={true}>{task.stage}</TaskStatus>}
    </Task>
  );
};
