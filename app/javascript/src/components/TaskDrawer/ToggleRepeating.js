import React from "react";
import gql from "graphql-tag";
import { Menu } from "@advisable/donut";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";

const SET_TASK_REPEAT = gql`
  mutation setTaskRepeat($input: SetTaskRepeatInput!) {
    setTaskRepeat(input: $input) {
      task {
        id
        repeat
      }
      errors {
        code
      }
    }
  }
`;

const ToggleRepeating = ({ isClient, task }) => {
  const { t } = useTranslation();
  const [setRepeating] = useMutation(SET_TASK_REPEAT);

  const handleClick = (_, menu) => {
    menu.hide();
    const repeat = task.repeat ? null : "Monthly";
    setRepeating({
      variables: {
        input: {
          id: task.id,
          repeat,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        setTaskRepeat: {
          __typename: "SetTaskRepeatPayload",
          task: {
            __typename: "Task",
            ...task,
            repeat,
          },
          errors: null,
        },
      },
    });
  };

  let title, description;
  if (task.repeat) {
    title = t("actions.removeTaskRepeat");
  } else {
    title = t("actions.repeatTask.title");
    if (isClient) {
      description = t("actions.repeatTask.description.client");
    } else {
      description = t("actions.repeatTask.description.specialist", { task });
    }
  }

  return (
    <Menu.Item title={title} description={description} onClick={handleClick} />
  );
};

export default ToggleRepeating;
