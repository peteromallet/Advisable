import * as React from "react";
import { ChildDataProps, graphql, compose } from "react-apollo";
import { match } from "react-router";
import TaskStatus from "../TaskStatus";
import Button from "../Button";
import Loading from "../Loading";
import Scrollable from "../Scrollable";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import VerticalLayout from "../VerticalLayout";
import Menu from "./Menu";
import Title from "./Title";
import DueDate from "./DueDate";
import Actions from "./Actions";
import Estimate from "./Estimate";
import Description from "./Description";
import {
  TaskDrawer,
  TaskDetails,
  Confirmation,
  ConfirmationContainer,
} from "./styles";
import FETCH_TASK from "./fetchTask.graphql";
import UPDATE_TASK from "./updateTask.graphql";
import graphqlClient from "../../graphqlClient";

interface Params {
  bookingId: string;
  taskId: string;
}

let timer;

const EditTask = ({ data, mutate }) => {
  const [attributes, setAttributes] = React.useState({
    name: "",
  });
  const [focusedElement, setFocusedElement] = React.useState(null);
  const [editAllowed, setEditAllowed] = React.useState(false);
  const [confirmPrompt, setConfirmPrompt] = React.useState(false);

  React.useEffect(() => {
    if (!data.loading) {
      const task = data.booking.task;
      setAttributes({
        name: task.name || "",
      });
    }
  }, [data.loading]);

  if (data.loading) return <Loading />;

  const task = data.booking.task;
  const isClient = true;

  const handleFocus = input => e => {
    setFocusedElement(input);

    // if (!editAllowed && isClient && task.status === "Quote Provided") {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   setConfirmPrompt(true);
    //   e.target.blur();
    //   return;
    // }
  };

  const handleConfirm = () => {
    setConfirmPrompt(false);
    setEditAllowed(true);
  };

  const handleBlur = () => {
    setEditAllowed(false);
  };

  const save = fields => {
    mutate({
      variables: {
        input: {
          id: task.airtableId,
          ...fields,
        },
      },
    });
  };

  const saveWithTimeout = attribute => value => {
    clearTimeout(timer);
    const newAttributes = { ...attributes, [attribute]: value };
    setAttributes(newAttributes);
    graphqlClient.writeData({
      id: `Task:${task.id}`,
      data: newAttributes,
    });
    timer = setTimeout(() => save(newAttributes), 1000);
  };

  return (
    <TaskDrawer>
      {confirmPrompt && (
        <Confirmation>
          <ConfirmationContainer>
            <p>
              Editing this task will remove the quote that has been provided.
              Are you sure you want to continue?
            </p>
            <ButtonGroup fullWidth>
              <Button onClick={handleConfirm} styling="primary">
                Continue
              </Button>
              <Button
                onClick={() => setConfirmPrompt(false)}
                styling="outlined"
              >
                Cancel
              </Button>
            </ButtonGroup>
          </ConfirmationContainer>
        </Confirmation>
      )}
      <Menu task={task} isClient={isClient} />
      <VerticalLayout>
        <VerticalLayout.Header>
          <Padding left="m" top="m" right="m">
            <TaskStatus showIcon>{task.stage}</TaskStatus>
            <Title
              onBlur={handleBlur}
              value={attributes.name}
              onFocus={handleFocus("TITLE")}
              onChange={saveWithTimeout("name")}
              autoFocus={!Boolean(task.name)}
              isFocused={editAllowed && focusedElement === "TITLE"}
            />
          </Padding>
        </VerticalLayout.Header>
        <VerticalLayout.Content>
          <Scrollable>
            <Padding left="m" bottom="m" right="m">
              <TaskDetails>
                <DueDate
                  task={task}
                  isClient={isClient}
                  onClick={handleFocus("DUE_DATE")}
                  onClose={handleBlur}
                  isOpen={editAllowed && focusedElement === "DUE_DATE"}
                />
                <Estimate
                  task={task}
                  isClient={isClient}
                  onClick={handleFocus("QUOTE")}
                  onClose={handleBlur}
                  isOpen={editAllowed && focusedElement === "QUOTE"}
                />
              </TaskDetails>
              <Description
                task={task}
                onBlur={handleBlur}
                onFocus={handleFocus("DESCRIPTION")}
                isFocused={editAllowed && focusedElement === "DESCRIPTION"}
              />
            </Padding>
          </Scrollable>
        </VerticalLayout.Content>
        <Actions isClient={isClient} task={task} />
      </VerticalLayout>
    </TaskDrawer>
  );
};
//

type Response = {
  task: any;
};

type Variables = {
  bookingId: string;
  taskId: string;
};

type InputProps = {
  match: match<Params>;
};

type ChildProps = ChildDataProps<{}, Response, Variables>;

export default compose(
  graphql<InputProps, Response, Variables, ChildProps>(FETCH_TASK, {
    options: props => ({
      variables: {
        bookingId: props.match.params.bookingId,
        taskId: props.match.params.taskId,
      },
    }),
  }),
  graphql(UPDATE_TASK)
)(EditTask);
