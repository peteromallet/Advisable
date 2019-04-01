import * as React from "react";
import Drawer from "../Drawer";
import Status from "../Status";
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
import usePrevious from "../../utilities/usePrevious";

export default ({ isOpen, onClose, task, isClient }) => {
  const [focusedElement, setFocusedElement] = React.useState(null);
  const [editAllowed, setEditAllowed] = React.useState(false);
  const [confirmPrompt, setConfirmPrompt] = React.useState(false);
  const editPreviouslyAllowed = usePrevious(editAllowed);

  const handleFocus = e => {
    setFocusedElement(e.target);

    if (!editAllowed && isClient && task.status === "Quote Provided") {
      e.preventDefault();
      e.stopPropagation();
      setConfirmPrompt(true);
      e.target.blur();
    }
  };

  // If the confirm state has just turned from false to true then focus on the
  // input
  React.useLayoutEffect(() => {
    if (editAllowed && !editPreviouslyAllowed) {
      focusedElement.focus();
    }
  });

  const handleConfirm = () => {
    setConfirmPrompt(false);
    setEditAllowed(true);
  };

  const handleBlur = e => {
    setEditAllowed(false);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
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
              <Status>{task.status}</Status>
              <Title
                value={task.name}
                onBlur={handleBlur}
                onFocus={handleFocus}
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
                    // onBlur={handleBlur}
                    // onFocus={handleFocus}
                  />
                  <Estimate task={task} isClient={isClient} />
                </TaskDetails>
                <Description
                  task={task}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
              </Padding>
            </Scrollable>
          </VerticalLayout.Content>
          <Actions isClient={isClient} task={task} />
        </VerticalLayout>
      </TaskDrawer>
    </Drawer>
  );
};
//
