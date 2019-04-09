import * as React from "react";
import { graphql } from "react-apollo";
import Icon from "../../components/Icon";
import { NewTask, NewTaskIcon } from "./styles";
import generateID from "../../utilities/generateID";
import CREATE_TASK from "./createTask.graphql";
import FETCH_TASK from "./fetchTask.graphql";

const Component = ({ bookingId, onCreate, mutate }) => {
  const handleClick = async () => {
    const id = generateID("tas");

    const task = {
      __typename: "Task",
      id,
      airtableId: "",
      createdAt: "",
      booking: {
        __typename: "Booking",
        id: bookingId,
      },
      name: null,
      estimate: null,
      dueDate: null,
      description: null,
      stage: "Added",
    };

    mutate({
      variables: {
        input: {
          booking: bookingId,
          id,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        createTask: {
          __typename: "CreateTaskPayload",
          errors: null,
          task,
        },
      },
      // update: (proxy, { data: { createTask } }) => {
      //   console.log("- update -", createTask)
      //   const data = {
      //     booking: {
      //       id: bookingId,
      //       __typename: "Booking",
      //       task: createTask.task,
      //     },
      //   };

      //   proxy.writeQuery({
      //     query: FETCH_TASK,
      //     options: {
      //       variables: {
      //         bookingId,
      //         taskId: id,
      //       },
      //     },
      //     data,
      //   });

      //   onCreate({ id });
      // },
    });

    onCreate(task);
  };

  return (
    <NewTask onClick={handleClick}>
      <NewTaskIcon>
        <Icon icon="plus" strokeWidth={2} />
      </NewTaskIcon>
      Add a task
    </NewTask>
  );
};

export default graphql<any, any, any, any>(CREATE_TASK)(Component);
