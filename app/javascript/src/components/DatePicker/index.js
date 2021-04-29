import React from "react";
import { DateTime } from "luxon";
import { Input, Card } from "@advisable/donut";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import NavBar from "./NavBar";
import { Wrapper } from "./styles";

function DatePicker(props) {
  return (
    <Wrapper>
      <DayPicker navbarElement={NavBar} showOutsideDays={true} {...props} />
    </Wrapper>
  );
}

DatePicker.Input = function DatePickerInput({
  disabledDays,
  label,
  onChange,
  ...props
}) {
  const popover = usePopoverState({ placement: "bottom-start", gutter: 0 });

  const handleSelection = (date) => {
    onChange(DateTime.fromJSDate(date).toISODate());
    popover.hide();
  };

  // useEffect(() => {
  //   if (!popover.visible) {
  //     onBlur();
  //   }
  // }, [popover, onBlur]);

  const selected = props.value && DateTime.fromISO(props.value);
  const inputValue = selected
    ? DateTime.fromISO(selected).toFormat("dd MMMM yyyy")
    : "";

  return (
    <>
      <PopoverDisclosure
        {...popover}
        {...props}
        as={Input}
        type="text"
        value={inputValue}
        onBlur={null}
        readOnly
      />
      <Popover
        {...popover}
        style={{ zIndex: 999, position: "absolute" }}
        aria-label={label}
      >
        <Card padding="m" elevation="xl">
          <DatePicker
            showOutsideDays={false}
            selectedDays={selected || []}
            disabledDays={disabledDays}
            onDayClick={handleSelection}
          />
        </Card>
      </Popover>
    </>
  );
};

export default DatePicker;
