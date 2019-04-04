import * as React from "react";
import { graphql } from "react-apollo";
import Loading from "../Loading";
import CREATE_TASK from "./createTask.graphql";

const NewTask = props => {
  const createTask = async () => {
    const response = await props.mutate({
      variables: {
        input: {
          booking: props.match.params.bookingId,
        },
      },
    });

    const task = response.data.createTask.task;
    if (task) {
      props.onCreate(task);
      props.history.replace(task.airtableId);
    }
  };

  React.useEffect(() => {
    createTask();
  }, []);

  return <Loading />;
};

export default graphql(CREATE_TASK)(NewTask);

