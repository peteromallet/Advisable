import * as React from "react";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import Icon from "../Icon";
import Popover from "../Popover";
import Button from "../Button";
import TextField from "../TextField";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import currency from "../../utilities/currency";
import {
  Detail,
  DetailIcon,
  DetailLabel,
  DetailValue,
  DetailPlaceholder,
  Popout,
} from "./styles";
import { Task } from "../../types";

interface Props {
  task: Task;
  isClient: boolean;
  onClick: (e: React.SyntheticEvent) => void;
  onClose: () => void;
  onChange: (estimate: number) => void;
  isOpen: boolean;
}

const numberMask = createNumberMask({
  prefix: "",
});

const calcEarnings = (hours: number, rate: string) => {
  const total = hours * parseFloat(rate);
  return total - total * 0.2;
};

export default ({ task, isClient, onClick, onClose, isOpen, onChange }) => {
  const saveButton = React.useRef(null);
  const [value, setValue] = React.useState(task.estimate);
  const [inputValue, setInputValue] = React.useState(value && value.toString());

  if (isClient && !task.estimate) {
    return null;
  }

  const earnings = value ? calcEarnings(value, "35.00") : null;

  const handleSave = popover => () => {
    popover.close();
    setValue(parseFloat(inputValue));
    onChange(parseFloat(inputValue));
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      saveButton.current.click();
    }
  }

  return (
    <Popover
      onClick={onClick}
      onClose={onClose}
      isOpen={isOpen}
      trigger={
        <Detail tabIndex={0}>
          <DetailIcon>
            <Icon strokeWidth={1} width={20} icon="clock" />
          </DetailIcon>
          <DetailLabel>Quote</DetailLabel>
          {!value || value === "" ? (
            <DetailPlaceholder>+ Add estimate</DetailPlaceholder>
          ) : (
            <DetailValue>{value} hours</DetailValue>
          )}
        </Detail>
      }
    >
      {popover => (
        <Popout>
          <Padding bottom="m">
            <TextField
              autoFocus
              value={inputValue}
              placeholder="e.g 8"
              mask={numberMask}
              onKeyDown={handleKeyDown}
              onChange={e => setInputValue(e.target.value)}
              label="How many hours do you think this task will take?"
              description={
                earnings && `You would earn ${currency(earnings)} for this task`
              }
            />
          </Padding>
          <ButtonGroup fullWidth>
            <Button ref={saveButton} styling="primary" onClick={handleSave(popover)}>
              Save
            </Button>
            <Button onClick={popover.close}>Cancel</Button>
          </ButtonGroup>
        </Popout>
      )}
    </Popover>
  );
};
