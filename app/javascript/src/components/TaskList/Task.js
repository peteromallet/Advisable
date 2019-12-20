import * as React from "react";
import * as moment from "moment";
import { Task, Title, Detail, TaskContent } from "./styles";
import Icon from "../Icon";
import TaskStatus from "../TaskStatus";
import { hoursLabel, displayTaskQuote } from "../../utilities/tasks";
import TrialIndicator from "./TrialIndicator";
import Prompt from "./Prompt";

const shouldShowPrompt = (isClient, task) => {
  if (task.stage === "Quote Requested" && !isClient) return true;
  if (task.stage === "Quote Provided" && isClient) return true;
  if (task.stage === "Assigned" && !isClient) return true;
  if (task.stage === "Submitted" && isClient) return true;
};

export default ({ task, hideStatus, onClick, isClient, showPromptForTask }) => {
  let showPrompt = shouldShowPrompt(isClient, task);

  if (showPromptForTask) {
    showPrompt = showPromptForTask(task);
  }

  return (
    <Task onClick={onClick} showPrompt={showPrompt}>
      {showPrompt && <Prompt />}
      {task.trial && <TrialIndicator isClient={isClient} />}
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
              {hoursLabel(task)}: <strong>{displayTaskQuote(task)}</strong>
            </span>
          </Detail>
        )}
      </TaskContent>
      {!hideStatus && <TaskStatus isClient={true}>{task.stage}</TaskStatus>}
    </Task>
  );
};
