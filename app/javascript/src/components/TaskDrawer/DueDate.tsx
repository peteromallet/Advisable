import * as moment from "moment";
import * as React from "react";
import Popper from "popper.js";
import DatePicker from "../DatePicker";
import { Detail, DetailIcon, DetailLabel, DetailValue, Popout } from "./styles";

export default ({ task }) => {
  const popoutRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(new Date(task.dueDate));

  const handleFocus = () => {
    setOpen(true);
  };

  const close = e => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

  const handleDocumentClick = e => {
    if (triggerRef.current.contains(e.target)) {
      return
    }

    setOpen(false)
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick)
    return () => document.removeEventListener("mousedown", handleDocumentClick)
  }, [])

  React.useLayoutEffect(() => {
    if (open && popoutRef) {
      new Popper(triggerRef.current, popoutRef.current, {
        placement: "bottom-start",
      });
    }
  }, [open, popoutRef]);

  return (
    <Detail
      tabIndex={0}
      ref={triggerRef}
      onFocus={handleFocus}
    >
      <DetailIcon />
      <DetailLabel>Due Date</DetailLabel>
      <DetailValue>
        {moment(selected).format("DD MMMM YYYY")}
      </DetailValue>
      {open && (
        <Popout ref={popoutRef}>
          <DatePicker
            selectedDays={selected}
            onDayClick={day => {
              setSelected(day)
              setOpen(false);
            }}
          />
          <div tabIndex={0} onFocus={close} />
        </Popout>
      )}
    </Detail>
  );
};
