import React from "react";
import { reduce } from "lodash";
import Tooltip from "../Tooltip";
import IconButton from "../IconButton";

const ACTIONS = {
  setRepeating: {
    allowed: () => true,
    render: ({}) => {
      return (
        <Tooltip
          placement="bottom-end"
          content="Make this a repeating task. You will have the opportunity to repeat this task every month."
        >
          <IconButton icon="repeat" />
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
      return <IconButton icon="trash" onClick={onDelete} />;
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

export default Actions;
