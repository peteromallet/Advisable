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
  onFocus: (e: React.SyntheticEvent) => void;
  onClose: () => void;
  isFocused: boolean;
}

const numberMask = createNumberMask({
  prefix: "",
});

const calcEarnings = (hours: string, rate: string) => {
  const total = parseInt(hours.replace(/,/g, "")) * parseFloat(rate);
  return total - total * 0.2;
};

export default ({ task, isClient,onFocus, onClose, isFocused }) => {
  const [value, setValue] = React.useState(task.estimate ? task.estimate.toString() : null);

  if (isClient && !task.estimate) {
    return null;
  }

  const earnings = value ? calcEarnings(value, "35.00") : null;

  return (
    <Popover
      onFocus={onFocus}
      onClose={onClose}
      isOpen={isFocused}
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
              value={value}
              placeholder="e.g 8"
              mask={numberMask}
              onChange={e => setValue(e.target.value)}
              label="How many hours do you think this task will take?"
              description={
                earnings && `You would earn ${currency(earnings)} for this task`
              }
            />
          </Padding>
          <ButtonGroup fullWidth>
            <Button styling="primary" onClick={popover.close}>
              Save
            </Button>
            <Button onClick={popover.close}>Cancel</Button>
          </ButtonGroup>
        </Popout>
      )}
    </Popover>
  );
};
