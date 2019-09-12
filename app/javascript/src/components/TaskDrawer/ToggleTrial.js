import React from "react";
import { Menu } from "@advisable/donut";
import { useMutation } from "react-apollo";
import { useTranslation } from "react-i18next";
import UPDATE_TASK from "./setTaskTrial";

const ToggleTrial = ({ isClient, task }) => {
  const { t } = useTranslation();
  const [updateTask] = useMutation(UPDATE_TASK);

  const handleClick = (_, menu) => {
    menu.hide();

    const trial = !task.trial;
    const optimisticResponse = {
      __typename: "Mutation",
      updateTask: {
        __typename: "UpdateTaskPayload",
        task: {
          __typename: "Task",
          ...task,
          trial,
          application: {
            ...task.application,
            trialTask: trial ? task : null,
          },
        },
        errors: null,
      },
    };

    if (!task.trial) {
      updateTask({
        variables: {
          input: { id: task.id, trial: true },
        },
        optimisticResponse,
      });
    }

    if (task.trial) {
      updateTask({
        variables: {
          input: { id: task.id, trial: false },
        },
        optimisticResponse,
      });
    }
  };

  let title;
  if (task.trial) {
    title = t("actions.removeTaskTrial");
  } else {
    title = t("actions.markTaskAsTrial");
  }

  return <Menu.Item title={title} onClick={handleClick} />;
};

export default ToggleTrial;
