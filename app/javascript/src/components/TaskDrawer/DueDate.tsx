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
  task: any;
  isClient: boolean;
  isFocused: boolean;
  onFocus?: (e: React.SyntheticEvent) => void;
  onClose: () => void;
}

export default ({ task, isClient, onFocus, isFocused, onClose }: Props) => {
  const [selected, setSelected] = React.useState(
    task.dueDate ? new Date(task.dueDate) : null
  );

  const initialMonth = selected || new Date();

  return (
    <Popover
      onFocus={onFocus}
      isOpen={isFocused}
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
            initialMonth={initialMonth}
            selectedDays={selected}
            onDayClick={day => {
              setSelected(day);
              popover.close();
            }}
          />
        </Popout>
      )}
    </Popover>
  );
};
