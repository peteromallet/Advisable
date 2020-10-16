import { Plus } from "@styled-icons/feather";
import { useMutation, useApolloClient } from "@apollo/client";
import { NewTask, NewTaskIcon } from "./styles";
import generateID from "../../utilities/generateID";
import CREATE_TASK from "../../graphql/mutations/createTask";
import TASK_DETAILS from "../../graphql/queries/taskDetails";

const Component = ({ application, onCreate }) => {
  const [mutate] = useMutation(CREATE_TASK);
  const client = useApolloClient();

  const handleClick = async () => {
    const id = generateID("tas");

    const task = {
      __typename: "Task",
      id,
      name: null,
      stage: "Not Assigned",
      dueDate: null,
      estimate: null,
      trial: false,
      finalCost: null,
      flexibleEstimate: null,
      description: null,
      createdAt: new Date().toISOString(),
      repeat: null,
      estimateType: "Hourly",
      application: {
        __typename: "Application",
        id: application.id,
        trialProgram: application.trialProgram || false,
        airtableId: application.airtableId,
        rate: "0",
        status: application.status,
        trialTask: application.trialTask || null,
        projectType: application.projectType,
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
    <NewTask onClick={handleClick} aria-label="Add a task">
      <NewTaskIcon>
        <Plus size={20} strokeWidth={2} />
      </NewTaskIcon>
      Add a project
    </NewTask>
  );
};

export default Component;
