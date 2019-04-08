import * as moment from "moment";
import * as React from "react";
import Icon from "../Icon";
import Popover from "../Popover";
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

  const handleSelection = (popover) => day => {
    onChange(day.toISOString());
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
            selectedDays={selected}
            initialMonth={initialMonth}
            onDayClick={handleSelection(popover)}
          />
        </Popout>
      )}
    </Popover>
  );
};
