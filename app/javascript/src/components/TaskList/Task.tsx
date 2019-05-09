import * as React from "react";
import * as moment from "moment";
import { Task as TaskType } from "../../types";
import { Task, Title, Detail, TaskContent, Prompt } from "./styles";
import Icon from "../Icon";
import TaskStatus from "../TaskStatus";
import pluarlize from "../../utilities/pluralize";

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
