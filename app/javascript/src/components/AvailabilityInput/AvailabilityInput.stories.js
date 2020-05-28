import React from "react";
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
