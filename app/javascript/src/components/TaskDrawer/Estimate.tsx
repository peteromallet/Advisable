import * as React from "react";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import Icon from "../Icon";
import Popover from "../Popover";
import Button from "../Button";
import InputLabel from "../InputLabel";
import InputDescription from "../InputDescription";
import TextField from "../TextField";
import FieldGroup from "../FieldGroup";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import SegmentedControl from "../SegmentedControl";
import currency from "../../utilities/currency";
import {
  hoursLabel,
  hoursDisplay,
  hasBeenSubmitted,
} from "../../utilities/tasks";
import {
  Detail,
  DetailIcon,
  DetailLabel,
  DetailValue,
  DetailPlaceholder,
  Popout,
  ArrowPrompt,
} from "./styles";
import { Task } from "../../types";

interface Props {
  task: Task;
  isClient: boolean;
  onClick: (e: React.SyntheticEvent) => void;
  onClose: () => void;
  onChange: (estimate: number) => void;
  isOpen: boolean;
  readOnly?: boolean;
}

const numberMask = createNumberMask({
  prefix: "",
});

const calcEarnings = (hours: string, rate: number) => {
  const hoursParsed = Boolean(hours) ? parseFloat(hours.replace(",", "")) : 0;
  const total = hoursParsed * rate;
  return total - total * 0.2;
};

export default ({
  task,
  isClient,
  onClick,
  onClose,
  isOpen,
  readOnly,
  onChange,
}) => {
  const saveButton = React.useRef(null);
  const [mode, setMode] = React.useState(
    Boolean(task.estimate) && Boolean(task.flexibleEstimate)
      ? "FLEXIBLE"
      : "STRICT"
  );
  const [values, setValues] = React.useState({
    estimate: String(task.estimate),
    flexibleEstimate: String(task.flexibleEstimate),
  });

  if (isClient && !task.estimate) {
    return null;
  }

  const rate = parseFloat(task.application.rate) * 100.0;

  const earnings = {
    estimate: calcEarnings(values.estimate, rate),
    flexibleEstimate: calcEarnings(values.flexibleEstimate, rate),
    hoursWorked: calcEarnings(String(task.hoursWorked), rate),
  };

  const earningsBeforeChange = {
    estimate: calcEarnings(String(task.estimate), rate),
    flexibleEstimate: calcEarnings(String(task.flexibleEstimate), rate),
  };

  const handleSave = popover => () => {
    popover.close();
    onChange({
      estimate: Number(values.estimate),
      flexibleEstimate: Boolean(values.flexibleEstimate)
        ? Number(values.flexibleEstimate)
        : null,
    });
  };

  const handleChangeMode = e => {
    setMode(e.target.value);
    if (e.target.value === "STRICT") {
      setValues({ ...values, flexibleEstimate: "" });
    }
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      saveButton.current.click();
    }
  };

  const handleChange = field => e => {
    setValues({
      ...values,
      [field]: e.target.value,
    });
  };

  let label;
  if (task.estimate) {
    label = currency(earnings.estimate, { format: "$0,0" });
  }

  if (task.estimate && task.flexibleEstimate) {
    label = `${currency(earningsBeforeChange.estimate, {
      format: "$0,0",
    })}-${currency(earningsBeforeChange.flexibleEstimate, { format: "$0,0" })}`;
  }

  if (hasBeenSubmitted(task)) {
    label = currency(earnings.hoursWorked, { format: "$0,0" });
  }

  return (
    <Popover
      onClick={onClick}
      onClose={onClose}
      isOpen={isOpen}
      trigger={
        <Detail aria-label="Estimate" readOnly={readOnly} tabIndex={0}>
          {task.stage === "Quote Requested" && (
            <ArrowPrompt>
              <Icon icon="arrow-up" strokeWidth={2} />
            </ArrowPrompt>
          )}
          <DetailIcon prompt={task.stage === "Quote Requested"}>
            <Icon strokeWidth={1} width={20} icon="clock" />
          </DetailIcon>
          <DetailLabel>{hoursLabel(task)}</DetailLabel>
          {Boolean(label) ? (
            <DetailValue>
              {hoursDisplay(task)} / {label}
            </DetailValue>
          ) : (
            <DetailPlaceholder>+ Add estimate</DetailPlaceholder>
          )}
        </Detail>
      }
    >
      {popover => (
        <Popout>
          <Padding bottom="m">
            <SegmentedControl
              value={mode}
              onChange={handleChangeMode}
              options={[
                { label: "Strict", value: "STRICT" },
                { label: "Flexible", value: "FLEXIBLE" },
              ]}
            />
          </Padding>
          <Padding bottom="m">
            <InputLabel>How many hours will this take you?</InputLabel>
            <FieldGroup spacing="s">
              <TextField
                size="s"
                autoFocus
                name="estimate"
                value={values.estimate}
                placeholder="8"
                mask={numberMask}
                onKeyDown={handleKeyDown}
                prefix={mode === "FLEXIBLE" && "Between"}
                onChange={handleChange("estimate")}
              />
              {mode === "FLEXIBLE" && (
                <TextField
                  size="s"
                  name="flexibleEstimate"
                  value={values.flexibleEstimate}
                  placeholder="16"
                  mask={numberMask}
                  prefix="and"
                  onKeyDown={handleKeyDown}
                  onChange={handleChange("flexibleEstimate")}
                />
              )}
            </FieldGroup>
            {mode === "STRICT" && earnings.estimate > 0 && (
              <InputDescription>
                You would earn {currency(earnings.estimate, { format: "$0,0" })}{" "}
                for this task
              </InputDescription>
            )}
            {mode === "FLEXIBLE" &&
              earnings.estimate > 0 &&
              earnings.flexibleEstimate > 0 && (
                <InputDescription>
                  You would earn between{" "}
                  {currency(earnings.estimate, { format: "$0,0" })} and{" "}
                  {currency(earnings.flexibleEstimate, { format: "$0,0" })} for
                  this task
                </InputDescription>
              )}
          </Padding>
          <ButtonGroup fullWidth>
            <Button
              ref={saveButton}
              styling="primary"
              onClick={handleSave(popover)}
            >
              Save
            </Button>
            <Button onClick={popover.close}>Cancel</Button>
          </ButtonGroup>
        </Popout>
      )}
    </Popover>
  );
};
