import React from "react";
import { last, reduce } from "lodash";
import { Formik, Form } from "formik";
import {
  format,
  formatISO,
  addMinutes,
  parseISO,
  isSameMinute,
} from "date-fns";
import Modal, { useModal } from "../Modal";
import Text from "../Text";

const calculateIntervals = availability => {
  return reduce(
    availability,
    (intervals, time, index) => {
      const asDate = parseISO(time);
      const lastInterval = last(intervals);

      if (!lastInterval || lastInterval.length === 2) {
        return [...intervals, [format(asDate, "ha")]];
      }

      const plus30Mins = addMinutes(asDate, 30);

      if (index < availability.length - 1) {
        const next = availability[index + 1];
        if (isSameMinute(parseISO(next), plus30Mins)) {
          return intervals;
        }
      }

      return [
        ...intervals.slice(0, intervals.length - 1),
        [lastInterval[0], format(plus30Mins, "ha")],
      ];
    },
    []
  );
};

const AvailabilityModal = ({ initialAvailability, selectedDay }) => {
  const modal = useModal();
  const initialIntervals = calculateIntervals(initialAvailability);

  const initialValues = {
    intervals:
      initialIntervals.length > 0 ? initialIntervals : [["9am", "5pm"]],
  };

  React.useEffect(() => {
    if (selectedDay !== null) {
      modal.show();
    } else {
      modal.hide();
    }
  }, [selectedDay]);

  return (
    <Modal modal={modal} padding="l" label="Select availability">
      {selectedDay && (
        <>
          <Text>{format(selectedDay, "cccc, dd MMM yyyy")}</Text>

          {initialValues.intervals.map((interval, i) => (
            <div key={i}>
              {interval[0]} -> {interval[1]}
            </div>
          ))}

          <select defaultValue="9am">
            {TIMES.map(time => (
              <option key={time}>{time}</option>
            ))}
          </select>

          <select defaultValue="5pm">
            {TIMES.map(time => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </>
      )}
    </Modal>
  );
};

const TIMES = [
  "12am",
  "1am",
  "2am",
  "3am",
  "4am",
  "5am",
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
  "10pm",
  "11pm",
];

export default AvailabilityModal;
