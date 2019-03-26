import * as React from "react";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import { useNotifications } from "../Notifications";
import {
  Label,
  Description,
  Confirmation,
  ConfirmationContainer,
} from "./styles";
import usePrevious from "../../utilities/usePrevious";

export default ({ task, ...props }) => {
  const ref = React.useRef(null);
  const [confirmation, setConfirmation] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(task.description);
  const [rows, setRows] = React.useState(1);
  const previousConfirmed = usePrevious(confirmed);
  const notifications = useNotifications();

  const LINE_HEIGHT = 20;
  const calculateRows = () => {
    const el = ref.current;
    const previousRows = el.rows;
    el.rows = 1;

    let currentRows = Math.floor(el.scrollHeight / LINE_HEIGHT);

    if (currentRows === previousRows) {
      el.rows = currentRows;
    }

    setRows(currentRows);
  };

  React.useLayoutEffect(calculateRows, [ref]);

  const handleChange = e => {
    calculateRows();
    setInputValue(e.target.value);
  };

  const handleFocus = e => {
    if (task.status === "In Progress") {
      notifications.notify("You can not edit the description of this task while it is in progress")
      e.target.blur();
      return
    }

    if (!confirmed && task.estimate) {
      e.target.blur();
      setConfirmation(true);
      return;
    }
  };

  const handleConfirm = () => {
    setConfirmation(false);
    setConfirmed(true);
  };

  const cancelConfirm = () => {
    setConfirmation(false);
  };

  const handleBlur = () => {
    setConfirmed(false);
  };

  // If the confirm state has just turned from false to true then focus on the
  // input
  React.useLayoutEffect(() => {
    if (confirmed && !previousConfirmed) {
      ref.current.focus();
    }
  });

  return (
    <>
      <Label>Description</Label>
      {confirmation && (
        <Confirmation>
          <ConfirmationContainer>
            <p>
              Thomas has added an estimate for this task. Editing the
              description will remove the estimate.
            </p>
            <ButtonGroup fullWidth>
              <Button onClick={handleConfirm} styling="primary">
                Continue
              </Button>
              <Button onClick={cancelConfirm} styling="outlined">
                Cancel
              </Button>
            </ButtonGroup>
          </ConfirmationContainer>
        </Confirmation>
      )}
      <Description
        type="text"
        {...props}
        ref={ref}
        rows={rows}
        value={inputValue}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        placeholder="Add a description..."
      />
    </>
  );
};
