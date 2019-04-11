import * as React from "react";
import Menu from "../Menu";
import { compose, graphql } from "react-apollo";
import DELETE_TASK from "./deleteTask.graphql";

interface Props {
  task: any;
  isClient: boolean;
  onDelete: (task: any) => void;
  deleteTask: (options: any) => any;
}

const Component = (props: Props) => {
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
