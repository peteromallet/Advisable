import { find } from "lodash-es";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { DateTime } from "luxon";
import { StyledAvailabilityInput } from "./styles";
import AvailabilityInputDay from "./AvailabilityInputDay";
import AvailabilityInputDays from "./AvailabilityInputDays";
import AvailabilityInputTime from "./AvailabilityInputTime";
import AvailabilityInputHeader from "./AvailabilityInputHeader";
import {
  timesInZone,
  isCellInSelection,
  addTimes,
  removeTimes,
  isWeekend,
  cellsFromSelection,
} from "./utilities";

const AvailabilityInput = React.memo(function AvailabilityInput({
  timezone,
  value,
  events,
  onChange,
  maxHeight,
  ...props
}) {
  const [selection, setSelection] = useState(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const tomorrow = DateTime.local().setZone(timezone).plus({ days: 1 });

  const zonedValue = useMemo(() => {
    return timesInZone(value, timezone);
  }, [value, timezone]);

  const eventForTime = (time) => {
    const parsed = DateTime.fromISO(time).setZone(timezone);
    return find(events, (event) => {
      const eventTime = DateTime.fromISO(event.time).setZone(timezone);
      return +parsed === +eventTime;
    });
  };

  const isTimeDisabled = (time) => {
    if (isWeekend(time, timezone)) return true;
    const event = eventForTime(time);
    if (event) return true;
    return false;
  };

  const times = useMemo(() => {
    let days = [];
    const startOfWeek = tomorrow
      .plus({ weeks: weekOffset })
      .setZone(timezone)
      .startOf("day");

    for (let column = 0; column <= 6; column++) {
      let dayTimes = [];
      const startOfDay = startOfWeek.plus({ days: column });

      for (let row = 0; row <= 47; row++) {
        const time = startOfDay.plus({ minutes: row * 30 });
        const event = eventForTime(time.toISO());

        dayTimes.push({
          time,
          row,
          column,
          isDisabled: isTimeDisabled(time.toISO()),
          event,
        });
      }

      days.push(dayTimes);
    }

    return days;
  }, [timezone, weekOffset]);

  const startOfWeek = times[0][0].time;
  const canGoBack = !startOfWeek.hasSame(tomorrow, "day");

  const handlePreviousWeek = useCallback(
    () => setWeekOffset((offset) => offset - 1),
    [setWeekOffset],
  );

  const handleNextWeek = useCallback(
    () => setWeekOffset((offset) => offset + 1),
    [setWeekOffset],
  );

  const isCellActive = (column, row) => {
    const time = times[column][row].time;
    return zonedValue.includes(time.toISO());
  };

  const handleMouseDown = useCallback(
    (column, row) =>
      setSelection({
        from: { column, row },
        to: { column, row },
      }),
    [setSelection],
  );

  const handleMouseOver = useCallback(
    (column, row) => {
      setSelection((selection) => {
        if (selection) {
          return {
            ...selection,
            to: { column, row },
          };
        }
      });
    },
    [setSelection],
  );

  useEffect(() => {
    const handleMouseUp = () => {
      if (!selection) return;
      const { column, row } = selection.from;
      const cells = cellsFromSelection(times, selection);

      const selectedTimes = [];
      cells.forEach((cell) => {
        if (!cell.isDisabled) {
          selectedTimes.push(cell.time.toISO());
        }
      });

      if (isCellActive(column, row)) {
        onChange(removeTimes(zonedValue, selectedTimes));
      } else {
        onChange(addTimes(zonedValue, selectedTimes));
      }

      setSelection(null);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [selection]);

  const isCellSelected = (cell) => {
    if (cell.isDisabled) return false;
    return isCellInSelection(selection, cell.column, cell.row);
  };

  return (
    <StyledAvailabilityInput {...props}>
      <AvailabilityInputHeader
        times={times}
        timezone={timezone}
        canGoBack={canGoBack}
        onNextWeek={handleNextWeek}
        onPreviousWeek={handlePreviousWeek}
      />
      <AvailabilityInputDays maxHeight={maxHeight}>
        {times.map((day) => (
          <AvailabilityInputDay key={day[0].time}>
            {day.map((cell) => (
              <AvailabilityInputTime
                {...cell}
                key={cell.time}
                onMouseDown={handleMouseDown}
                onMouseOver={handleMouseOver}
                isSelected={isCellSelected(cell)}
                isActive={isCellActive(cell.column, cell.row)}
              />
            ))}
          </AvailabilityInputDay>
        ))}
      </AvailabilityInputDays>
    </StyledAvailabilityInput>
  );
});

AvailabilityInput.defaultProps = {
  timezone: DateTime.local().zoneName,
  events: [],
};

export default AvailabilityInput;
