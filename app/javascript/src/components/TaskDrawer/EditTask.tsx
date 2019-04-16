import * as React from "react";
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
import graphqlClient from "../../graphqlClient";
import { Task } from "../../types";

interface Params {
  task: Task;
  readOnly: boolean;
  onSave: (fields: any) => void;
  onDeleteTask: (task: Task) => void;
  hideStatus?: boolean;
}

let timer;

const EditTask = ({ task, onDeleteTask, readOnly, hideStatus, onSave }) => {
  const [attributes, setAttributes] = React.useState({
    name: task.name || "",
    description: task.description || "",
    dueDate: task.dueDate || "",
    estimate: task.estimate || "",
  });
  const [focusedElement, setFocusedElement] = React.useState(null);
  const [editAllowed, setEditAllowed] = React.useState(false);
  const [confirmPrompt, setConfirmPrompt] = React.useState(false);
  const isClient = false;

  const handleFocus = input => e => {
    if (readOnly) {
      e.preventDefault();
      return;
    }

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

  const updateField = (attribute, value) => {
    const newData = { ...attributes, [attribute]: value };
    setAttributes(newData);
    graphqlClient.writeData({ id: `Task:${task.id}`, data: newData });
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
      {!readOnly && (
        <Menu task={task} isClient={isClient} onDelete={onDeleteTask} />
      )}
      <VerticalLayout>
        <VerticalLayout.Header>
          <Padding left="m" top="m" right="m">
            {!hideStatus && <TaskStatus showIcon>{task.stage}</TaskStatus>}
            <Title
              onBlur={handleBlur}
              readOnly={readOnly}
              value={attributes.name}
              onFocus={handleFocus("TITLE")}
              onChange={handleChangeWithTimeout("name")}
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
                  readOnly={readOnly}
                  value={attributes.dueDate}
                  onClick={handleFocus("DUE_DATE")}
                  onClose={handleBlur}
                  onChange={handleChange("dueDate")}
                  isOpen={editAllowed && focusedElement === "DUE_DATE"}
                />
                <Estimate
                  task={task}
                  readOnly={readOnly}
                  isClient={isClient}
                  onClick={handleFocus("QUOTE")}
                  onClose={handleBlur}
                  onChange={handleChange("estimate")}
                  isOpen={editAllowed && focusedElement === "QUOTE"}
                />
              </TaskDetails>
              <Description
                readOnly={readOnly}
                value={attributes.description}
                onBlur={handleBlur}
                onFocus={handleFocus("DESCRIPTION")}
                onChange={handleChangeWithTimeout("description")}
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

export default EditTask;
