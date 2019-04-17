import * as React from "react";
import { match } from "react-router";
import TaskStatus from "../TaskStatus";
import Text from "../Text";
import Button from "../Button";
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
import graphqlClient from "../../graphqlClient";
import { Task } from "../../types";
import StageDescription from "./StageDescription";

interface Params {
  task: Task;
  readOnly: boolean;
  onSave: (fields: any) => void;
  onDeleteTask: (task: Task) => void;
  hideStatus?: boolean;
  isClient?: boolean;
  showStatusNotice?: boolean;
}

const READ = "READ";
const WRITE = "WRITE";
const PROMPT = "PROMPT";

const PERMISSIONS = {
  "Not Assigned": {
    title: () => WRITE,
    dueDate: () => WRITE,
    estimate: isClient => (isClient ? READ : WRITE),
    description: () => WRITE,
  },
  "Quote Requested": {
    title: () => WRITE,
    dueDate: () => WRITE,
    estimate: isClient => (isClient ? READ : WRITE),
    description: () => WRITE,
  },
  "Quote Provided": {
    title: isClient => (isClient ? PROMPT : READ),
    dueDate: isClient => (isClient ? PROMPT : READ),
    estimate: isClient => (isClient ? READ : WRITE),
    description: isClient => (isClient ? PROMPT : READ),
  },
};

const getTaskPermission = (task, key, isClient) => {
  const permissions = PERMISSIONS[task.stage];
  if (!permissions) return READ;
  const permission = permissions[key];
  if (!permission) return READ;
  return permission(isClient);
};

let timer;

const EditTask = ({
  task,
  onDeleteTask,
  readOnly,
  hideStatus,
  onSave,
  isClient,
  showStatusNotice,
}) => {
  const [attributes, setAttributes] = React.useState({
    name: task.name || "",
    description: task.description || "",
    dueDate: task.dueDate || "",
    estimate: task.estimate || "",
  });
  const [editAllowed, setEditAllowed] = React.useState(false);
  const [confirmPrompt, setConfirmPrompt] = React.useState(false);
  const [focusedElement, setFocusedElement] = React.useState(null);

  const handleFocus = input => e => {
    if (readOnly || getTaskPermission(task, input, isClient) === READ) {
      e.preventDefault();
      return;
    }

    setFocusedElement(input);

    if (!editAllowed && getTaskPermission(task, input, isClient) === PROMPT) {
      e.preventDefault();
      e.stopPropagation();
      setConfirmPrompt(true);
      e.target.blur();
      return;
    }
  };

  const handleConfirm = () => {
    setConfirmPrompt(false);
    setEditAllowed(true);
  };

  const handleBlur = () => {
    setEditAllowed(false);
  };

  const updateField = (attribute, value) => {
    const newData = { ...attributes, [attribute]: value };
    setAttributes(newData);

    let stage = task.stage;
    // Immediately update the stage in the cache if the freelancer is providing
    // an estimate.
    if (task.stage === "Quote Requested" && attribute === "estimate") {
      stage = "Quote Provided";
    }

    graphqlClient.writeData({
      id: `Task:${task.id}`,
      data: {
        ...newData,
        stage,
      },
    });

    return newData;
  };

  const handleChange = attribute => value => {
    updateField(attribute, value);
    onSave({ [attribute]: value });
  };

  const handleChangeWithTimeout = attribute => value => {
    updateField(attribute, value);
    clearTimeout(timer);
    timer = setTimeout(() => onSave({ [attribute]: value }), 1000);
  };

  const titleReadOnly =
    readOnly || getTaskPermission(task, "title", isClient) === READ;
  const dueDateReadOnly =
    readOnly || getTaskPermission(task, "dueDate", isClient) === READ;
  const estimateReadOnly =
    readOnly || getTaskPermission(task, "estimate", isClient) === READ;
  const descriptionReadOnly =
    readOnly || getTaskPermission(task, "description", isClient) === READ;

  return (
    <TaskDrawer>
      {confirmPrompt && (
        <Confirmation>
          <ConfirmationContainer>
            <Padding bottom="l">
              <Text size="s">
                Editing this task will remove the quote that has been provided.
                Are you sure you want to continue?
              </Text>
            </Padding>
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
      {!readOnly && (
        <Menu task={task} isClient={isClient} onDelete={onDeleteTask} />
      )}
      <VerticalLayout>
        <VerticalLayout.Header>
          <Padding left="m" top="m" right="m">
            {!hideStatus && <TaskStatus>{task.stage}</TaskStatus>}
            <Title
              onBlur={handleBlur}
              readOnly={titleReadOnly}
              value={attributes.name}
              onFocus={handleFocus("title")}
              onChange={handleChangeWithTimeout("name")}
              autoFocus={!Boolean(task.name)}
              isFocused={editAllowed && focusedElement === "title"}
            />
          </Padding>
        </VerticalLayout.Header>
        <VerticalLayout.Content>
          <Scrollable>
            <Padding left="m" bottom="m" right="m">
              <TaskDetails>
                <DueDate
                  readOnly={dueDateReadOnly}
                  value={attributes.dueDate}
                  onClick={handleFocus("dueDate")}
                  onClose={handleBlur}
                  onChange={handleChange("dueDate")}
                  isOpen={editAllowed && focusedElement === "dueDate"}
                />
                <Estimate
                  task={task}
                  readOnly={estimateReadOnly}
                  isClient={isClient}
                  onClick={handleFocus("estimate")}
                  onClose={handleBlur}
                  onChange={handleChange("estimate")}
                  isOpen={editAllowed && focusedElement === "estimate"}
                />
              </TaskDetails>
              {showStatusNotice && (
                <StageDescription isClient={isClient} task={task} />
              )}
              <Description
                readOnly={descriptionReadOnly}
                value={attributes.description}
                onBlur={handleBlur}
                onFocus={handleFocus("description")}
                onChange={handleChangeWithTimeout("description")}
                isFocused={editAllowed && focusedElement === "description"}
              />
            </Padding>
          </Scrollable>
        </VerticalLayout.Content>
        {!readOnly && <Actions isClient={isClient} task={task} />}
      </VerticalLayout>
    </TaskDrawer>
  );
};

export default EditTask;
