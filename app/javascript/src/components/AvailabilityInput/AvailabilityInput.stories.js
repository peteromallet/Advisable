import React from "react";
import { DateTime } from "luxon";
import { Card, Text, Select } from "../../../../../donut/src";
import AvailabilityInput from "./";

export default {
  title: "Availability Input",
};

export const basic = () => {
  const [value, setValue] = React.useState([]);
  const [timezone, setTimezone] = React.useState("Europe/Dublin");

  return (
    <Card maxWidth={800} margin="50px auto" padding="l">
      <Text mb="xxs" fontWeight="medium">
        Timezone
      </Text>
      <Select
        mb="20px"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
      >
        <option>Europe/Dublin</option>
        <option>Europe/Berlin</option>
        <option>America/New_York</option>
      </Select>
      <AvailabilityInput
        value={value}
        onChange={setValue}
        timezone={timezone}
      />
    </Card>
  );
};

export const withEvents = () => {
  const [value, setValue] = React.useState([]);
  const [timezone, setTimezone] = React.useState("Europe/Dublin");

  let nonWeekday;

  for (let i = 1; i < 7; i++) {
    const day = DateTime.local().plus({ days: i });
    if (![6, 7].includes(day.weekday)) {
      nonWeekday = day.set({
        hour: 10,
        minutes: 0,
        seconds: 0,
        millisecond: 0,
      });
      break;
    }
  }

  const events = [
    {
      time: nonWeekday.toISO(),
      label: "Interview with Thomas",
    },
    {
      time: nonWeekday.set({ hours: 12 }).toISO(),
      label: "Interview with Jane Doe",
    },
    {
      time: "2020-06-02T12:00:00.000+02:00",
      label: "Interview with Peter",
    },
  ];

  return (
    <Card maxWidth={800} margin="50px auto" padding="l">
      <Text mb="xxs" fontWeight="medium">
        Timezone
      </Text>
      <Select
        mb="20px"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
      >
        <option>Europe/Dublin</option>
        <option>Europe/Berlin</option>
        <option>America/New_York</option>
      </Select>
      <AvailabilityInput
        value={value}
        events={events}
        onChange={setValue}
        timezone={timezone}
      />
    </Card>
  );
};
