import React from "react";
import MarkAsTrial from "./MarkAsTrial";

// TaskActions takes the task and renders actions based on its stage
// task = The task that is returned from the graphql API. This also includes
// some basic information about the associated application record.
// isClient = Wether or not the task is being viewed by a client or specialist.
const TaskActions = props => {
  const { isClient, task } = props;

  if (!isClient && !task.application.trialTask) {
    return <MarkAsTrial {...props} />;
  }

  return null;
};

export default TaskActions;
