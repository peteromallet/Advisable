import * as moment from "moment";
import * as React from "react";
import Icon from "../Icon";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Popover from "../Popover";
import { Padding } from "../Spacing";
import DatePicker from "../DatePicker";
import {
  Detail,
  DetailIcon,
  DetailLabel,
  DetailValue,
  DetailPlaceholder,
  Popout,
} from "./styles";

interface Props {
  value: string;
  isOpen: boolean;
  onClick?: (e: React.SyntheticEvent) => void;
  onClose: () => void;
  onChange: (date: string) => void;
}

export default ({ value, onChange, onClick, isOpen, onClose }: Props) => {
  const selected = value ? new Date(value) : null;
  const initialMonth = selected || new Date();

  const handleSelection = popover => (day, modifiers) => {
    if (modifiers.disabled) return;
    onChange(day.toISOString());
    popover.close();
  };

  const isDayDisabled = day => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return day < now;
  };

  const handleRemove = popover => () => {
    onChange(null);
    popover.close();
  }

  return (
    <Popover
      onClick={onClick}
      isOpen={isOpen}
      onClose={onClose}
      trigger={
        <Detail tabIndex={0}>
          <DetailIcon>
            <Icon strokeWidth={1} width={20} icon="calendar" />
          </DetailIcon>
          <DetailLabel>Due Date</DetailLabel>
          {selected ? (
            <DetailValue>{moment(selected).format("DD MMMM YYYY")}</DetailValue>
          ) : (
            <DetailPlaceholder>+ Add due date</DetailPlaceholder>
          )}
        </Detail>
      }
    >
      {popover => (
        <Popout>
          <DatePicker
            showOutsideDays={false}
            selectedDays={selected}
            initialMonth={initialMonth}
            disabledDays={isDayDisabled}
            onDayClick={handleSelection(popover)}
          />
          {selected && (
            <Padding top="m">
              <ButtonGroup fullWidth>
                <Button onClick={handleRemove(popover)}>Remove due date</Button>
              </ButtonGroup>
            </Padding>
          )}
        </Popout>
      )}
    </Popover>
  );
};
