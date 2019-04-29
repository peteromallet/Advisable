import * as React from "react";
import reduce from "lodash/reduce";
import Menu from "../Menu";
import { compose, graphql } from "react-apollo";
import DELETE_TASK from "./deleteTask.graphql";

interface Props {
  task: any;
  isClient: boolean;
  onDelete: (task: any) => void;
  deleteTask: (options: any) => any;
}

const ACTIONS = {
  delete: (task) => {
    if (task.stage === "Not Assigned") return true;
    if (task.stage === "Quote Requested") return true;
    if (task.stage === "Quote Provided") return true;
    return false
  }
}

const Component = (props: Props) => {
  const allowedActions = reduce(ACTIONS, (actions, isAllowed, action) => {
    if (isAllowed(props.task)) {
      return [...actions, action]
    }
    return actions;
  }, [])

  // for now there is only a single delte action and so we can just return
  // nothing if there are no permitted actions
  if (allowedActions.length === 0) return null;

  const handleDelete = popover => async () => {
    props.onDelete(props.task);
    popover.close();
    await props.deleteTask({
      variables: {
        input: {
          task: props.task.id,
        },
      },
    });
  };

  return (
    <Menu>
      {popover => (
        <Menu.Item icon="trash" onClick={handleDelete(popover)}>Delete...</Menu.Item>
      )}
    </Menu>
  );
};

export default compose(graphql(DELETE_TASK, { name: "deleteTask" }))(
  Component
);
