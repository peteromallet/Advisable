import * as moment from "moment";
import * as React from "react";
import { Card, Button } from "@advisable/donut";
import { Calendar } from "@styled-icons/feather";
import { AnimatePresence, motion } from "framer-motion";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";
import { Padding } from "../Spacing";
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
  onClose,
  readOnly,
}) {
  const selected = value ? new Date(value) : null;
  const initialMonth = selected || new Date();
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
          <DetailValue>{moment(selected).format("DD MMMM YYYY")}</DetailValue>
        ) : (
          <DetailPlaceholder>+ Add due date</DetailPlaceholder>
        )}
      </PopoverDisclosure>
      <Popover
        {...popover}
        style={{ zIndex: 99 }}
        aria-label="Provide due date"
      >
        <AnimatePresence>
          {popover.visible && (
            <Card
              padding="m"
              elevation="xl"
              as={motion.div}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <DatePicker
                showOutsideDays={false}
                selectedDays={selected}
                initialMonth={initialMonth}
                disabledDays={isDayDisabled}
                onDayClick={handleSelection(popover)}
              />
              {selected && (
                <Padding top="m">
                  <Button width="100%" onClick={handleRemove(popover)}>
                    Remove due date
                  </Button>
                </Padding>
              )}
            </Card>
          )}
        </AnimatePresence>
      </Popover>
    </>
  );
}
