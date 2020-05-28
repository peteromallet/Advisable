import { DateTime } from "luxon";

export function isCellInSelection(selection, column, row) {
  if (!selection) return false;
  const { from, to } = selection;
  const posX = column >= from.column && column <= to.column;
  const negX = column <= from.column && column >= to.column;
  const posY = row >= from.row && row <= to.row;
  const negY = row <= from.row && row >= to.row;
  return (posX && posY) || (negX && posY) || (negX && negY) || (posX && negY);
}

export function cellsFromSelection(times, selection) {
  const selectedTimes = [];

  times.forEach((day, column) => {
    day.forEach((cell, row) => {
      if (isCellInSelection(selection, column, row)) {
        selectedTimes.push(cell);
      }
    });
  });

  return selectedTimes;
}

export function removeTimes(value, selectedTimes) {
  return value.filter((time) => !selectedTimes.includes(time));
}

export function addTimes(value, selectedTimes) {
  return [...value, ...selectedTimes];
}

export function isWeekend(time, timezone) {
  const parsed = DateTime.fromISO(time).setZone(timezone);
  return [6, 7].includes(parsed.weekday);
}
