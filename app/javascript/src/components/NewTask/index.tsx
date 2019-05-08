import * as React from "react";
import { graphql, ApolloConsumer } from "react-apollo";
import Icon from "../../components/Icon";
import { NewTask, NewTaskIcon } from "./styles";
import generateID from "../../utilities/generateID";
import CREATE_TASK from "../../graphql/mutations/createTask";
import TASK_DETAILS from "../../graphql/queries/taskDetails";

const Component = ({ application, onCreate, mutate }) => {
  const handleClick = client => async () => {
    const id = generateID("tas");

    const task = {
      __typename: "Task",
      id,
      name: null,
      stage: "Not Assigned",
      dueDate: null,
      estimate: null,
      description: null,
      createdAt: new Date().toISOString(),
      repeat: null,
      application: {
        __typename: "Application",
        id: application.id,
        rate: "0",
        specialist: {
          __typename: "Specialist",
          id: application.specialist.id,
          firstName: application.specialist.firstName,
        },
        project: {
          __typename: "Project",
          id: application.project.id,
          currency: "EUR",
          user: {
            __typename: "User",
            id: application.project.user.id,
            companyName: application.project.user.companyName,
          },
        },
      },
    };

    mutate({
      variables: {
        input: {
          application: application.airtableId,
          id,
        },
      },
    });

    client.writeQuery({
      query: TASK_DETAILS,
      variables: { id },
      data: { task },
    });

    onCreate(task);
  };

  return (
    <ApolloConsumer>
      {client => (
        <NewTask onClick={handleClick(client)}>
          <NewTaskIcon>
            <Icon icon="plus" strokeWidth={2} />
          </NewTaskIcon>
          Add a task
        </NewTask>
      )}
    </ApolloConsumer>
  );
};

export default graphql<any, any, any, any>(CREATE_TASK)(Component);
