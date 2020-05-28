import React, { useState, useMemo, useCallback, useEffect } from "react";
import { DateTime } from "luxon";
import { StyledAvailabilityInput } from "./styles";
import AvailabilityInputDay from "./AvailabilityInputDay";
import AvailabilityInputDays from "./AvailabilityInputDays";
import AvailabilityInputTime from "./AvailabilityInputTime";
import AvailabilityInputHeader from "./AvailabilityInputHeader";
import {
  isCellInSelection,
  addTimes,
  removeTimes,
  isWeekend,
  cellsFromSelection,
} from "./utilities";

const AvailabilityInput = React.memo(function AvailabilityInput({
  timezone,
  value,
  onChange,
  maxHeight,
  ...props
}) {
  const [selection, setSelection] = useState(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const tomorrow = DateTime.local().setZone(timezone).plus({ days: 1 });

  const zonedValue = useMemo(() => {
    return value.map((time) => {
      return DateTime.fromISO(time).setZone(timezone).toISO();
    });
  }, [value, timezone]);

  const times = useMemo(() => {
    let days = [];
    const startOfWeek = tomorrow
      .plus({ weeks: weekOffset })
      .setZone(timezone)
      .startOf("day");

    for (let d = 0; d <= 6; d++) {
      let dayTimes = [];
      const startOfDay = startOfWeek.plus({ days: d });

      for (let t = 0; t <= 47; t++) {
        dayTimes.push({
          time: startOfDay.plus({ minutes: t * 30 }).toISO(),
          row: t,
          column: d,
          isDisabled: isWeekend(
            startOfDay.plus({ minutes: t * 30 }).toISO(),
            timezone,
          ),
        });
      }

      days.push(dayTimes);
    }

    return days;
  }, [timezone, weekOffset]);

  const startOfWeek = DateTime.fromISO(times[0][0].time).setZone(timezone);
  const canGoBack = !startOfWeek.hasSame(tomorrow, "day");

  const handlePreviousWeek = useCallback(
    () => setWeekOffset((offset) => offset - 1),
    [setWeekOffset],
  );

  const handleNextWeek = useCallback(
    () => setWeekOffset((offset) => offset + 1),
    [setWeekOffset],
  );

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [selection]);

  const isCellActive = (column, row) => {
    const time = times[column][row].time;
    return zonedValue.includes(time);
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

  const isTimeDisabled = (time) => {
    return isWeekend(time, timezone);
  };

  const isCellSelected = (cell) => {
    if (isTimeDisabled(cell.time)) return false;
    return isCellInSelection(selection, cell.column, cell.row);
  };

  const handleMouseUp = () => {
    if (!selection) return;
    const { column, row } = selection.from;
    const cells = cellsFromSelection(times, selection);

    const selectedTimes = [];
    cells.forEach((cell) => {
      if (!cell.isDisabled) {
        selectedTimes.push(cell.time);
      }
    });

    if (isCellActive(column, row)) {
      onChange(removeTimes(zonedValue, selectedTimes));
    } else {
      onChange(addTimes(zonedValue, selectedTimes));
    }

    setSelection(null);
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
        {times.map((day, column) => (
          <AvailabilityInputDay key={day[0].time}>
            {day.map((cell, row) => (
              <AvailabilityInputTime
                {...cell}
                key={cell.time}
                onMouseDown={handleMouseDown}
                onMouseOver={handleMouseOver}
                isSelected={isCellSelected(cell)}
                isActive={zonedValue.includes(cell.time)}
                label={DateTime.fromISO(cell.time)
                  .setZone(timezone)
                  .toLocaleString(DateTime.DATETIME_MED)}
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
};

export default AvailabilityInput;
