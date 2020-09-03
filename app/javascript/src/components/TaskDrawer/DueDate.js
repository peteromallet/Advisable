import * as React from "react";
import { DateTime } from "luxon";
import { Card, Button, Box } from "@advisable/donut";
import { Calendar } from "@styled-icons/feather";
import { AnimatePresence, motion } from "framer-motion";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";
import DatePicker from "../DatePicker";
import {
  Detail,
  DetailIcon,
  DetailLabel,
  DetailValue,
  DetailPlaceholder,
} from "./styles";

export default function DueDate({
  value,
  onChange,
  onClick,
  isOpen,
  readOnly,
}) {
  const selected = value ? DateTime.fromISO(value) : null;
  const initialMonth = selected || DateTime.local();
  const popover = usePopoverState({ placement: "bottom-start" });

  React.useEffect(() => {
    if (isOpen && !popover.visible) {
      popover.show();
    }
  }, [isOpen]);

  const handleSelection = (popover) => (day, modifiers) => {
    if (modifiers.disabled) return;
    onChange(day.toISOString());
    popover.hide();
  };

  const isDayDisabled = (day) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return day < now;
  };

  const handleRemove = (popover) => () => {
    onChange(null);
    popover.hide();
  };

  return (
    <>
      <PopoverDisclosure
        as={Detail}
        aria-label="Due Date"
        disabled={readOnly}
        {...popover}
        onClick={onClick}
      >
        <DetailIcon>
          <Calendar />
        </DetailIcon>
        <DetailLabel>Due Date</DetailLabel>
        {selected ? (
          <DetailValue>{selected.toFormat("dd MMM yyyy")}</DetailValue>
        ) : (
          <DetailPlaceholder>+ Add due date</DetailPlaceholder>
        )}
      </PopoverDisclosure>
      <Popover
        {...popover}
        style={{ zIndex: 9999 }}
        aria-label="Provide due date"
      >
        <Card padding="m" elevation="xl">
          <DatePicker
            showOutsideDays={false}
            selectedDays={selected}
            initialMonth={initialMonth.toJSDate()}
            disabledDays={isDayDisabled}
            onDayClick={handleSelection(popover)}
          />
          {selected && (
            <Box paddingTop="m">
              <Button width="100%" onClick={handleRemove(popover)}>
                Remove due date
              </Button>
            </Box>
          )}
        </Card>
      </Popover>
    </>
  );
}
