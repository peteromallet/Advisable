import React from "react";
import { reduce } from "lodash";
import { compose, graphql } from "react-apollo";
import { useTranslation } from "react-i18next";
import Text from "../Text";
import Tooltip from "../Tooltip";
import IconButton from "../IconButton";
import SET_TASK_REPEAT from "./setTaskRepeat.graphql";

const ACTIONS = {
  setRepeating: {
    allowed: () => true,
    render: ({ task, setTaskRepeat, isClient }) => {
      const [t] = useTranslation();
      const handleClick = async () => {
        const repeat = task.repeat ? null : "Monthly";

        await setTaskRepeat({
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

      const button = (
        <IconButton
          icon="repeat"
          onClick={handleClick}
          active={Boolean(task.repeat)}
        />
      );

      // If the task is set to repeating then don't show any tooltip
      if (Boolean(task.repeat)) {
        return <span key="repeat">{button}</span>;
      }

      let title = "tasks.actions.setRepeating.specialist.title";
      let description = "tasks.actions.setRepeating.specialist.description";

      if (isClient) {
        title = "tasks.actions.setRepeating.client.title";
        description = "tasks.actions.setRepeating.client.description";
      }

      return (
        <Tooltip
          key="setRepeat"
          placement="bottom-end"
          content={
            <>
              <Text colour="white" weight="semibold" size="xs">
                {t(title, { task })}
              </Text>
              <Text colour="subtleWhite" size="xs">
                {t(description, { task })}
              </Text>
            </>
          }
        >
          {button}
        </Tooltip>
      );
    },
  },
  delete: {
    allowed: ({ task }) => {
      if (task.stage === "Not Assigned") return true;
      if (task.stage === "Quote Requested") return true;
      if (task.stage === "Quote Provided") return true;
      return false;
    },
    render: ({ onDelete }) => {
      return <IconButton key="delete" icon="trash" onClick={onDelete} />;
    },
  },
};

const Actions = props => {
  return reduce(
    ACTIONS,
    (actions, action, _) => {
      if (action.allowed(props)) {
        return [...actions, action.render(props)];
      }
      return actions;
    },
    []
  );
};

export default compose(graphql(SET_TASK_REPEAT, { name: "setTaskRepeat" }))(
  Actions
);
