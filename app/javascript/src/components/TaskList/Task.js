import * as React from "react";
import { DateTime } from "luxon";
import { Text } from "@advisable/donut";
import { Calendar, Clock } from "@styled-icons/feather";
import { Task, Title, Detail, TaskContent } from "./styles";
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

export default ({
  task,
  hideStatus,
  onClick,
  isClient,
  showPromptForTask,
  notice,
}) => {
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
            <Calendar size={16} strokeWidth={2} />
            <Text fontSize="xs" ml="xs">
              Due:{" "}
              <strong>
                {DateTime.fromISO(task.dueDate).toFormat("dd MMMM")}
              </strong>
            </Text>
          </Detail>
        )}
        {Boolean(task.estimate) && (
          <Detail>
            <Clock size={16} strokeWidth={2} />
            <Text fontSize="xs" ml="xs" color="neutral600">
              {hoursLabel(task)}: <strong>{displayTaskQuote(task)}</strong>
            </Text>
          </Detail>
        )}
        {notice && (
          <Text fontSize="xs" color="orange700" mb="xxs">
            {notice}
          </Text>
        )}
      </TaskContent>
      {!hideStatus && <TaskStatus isClient={true}>{task.stage}</TaskStatus>}
    </Task>
  );
};
