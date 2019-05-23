import * as React from "react";
import * as moment from "moment";
import { Task as TaskType } from "../../types";
import { Task, Title, Detail, TaskContent, Prompt } from "./styles";
import Icon from "../Icon";
import TaskStatus from "../TaskStatus";
import { hoursLabel, hoursDisplay } from "../../utilities/tasks";

interface Props {
  task: TaskType;
  isClient?: boolean;
  onClick: () => void;
  hideStatus?: boolean;
  showPromptForTask?: (task: TaskType) => boolean;
}

const shouldShowPrompt = (isClient, task) => {
  if (task.stage === "Quote Requested" && !isClient) return true;
  if (task.stage === "Quote Provided" && isClient) return true;
  if (task.stage === "Assigned" && !isClient) return true;
  if (task.stage === "Submitted" && isClient) return true;
};

export default ({
  task,
  hideStatus,
  onClick,
  isClient,
  showPromptForTask,
}: Props) => {
  let showPrompt = shouldShowPrompt(isClient, task);

  if (showPromptForTask) {
    showPrompt = showPromptForTask(task);
  }

  return (
    <Task onClick={onClick} showPrompt={showPrompt}>
      {showPrompt && <Prompt />}
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
        {Boolean(task.estimate) && (
          <Detail>
            <Icon height={17} icon="clock" />
            <span>
              {hoursLabel(task)}: <strong>{hoursDisplay(task)}</strong>
            </span>
          </Detail>
        )}
      </TaskContent>
      {!hideStatus && <TaskStatus isClient={true}>{task.stage}</TaskStatus>}
    </Task>
  );
};
