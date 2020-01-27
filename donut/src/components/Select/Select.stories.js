import React from "react";
import Select from "./";
import Card from "../Card";
import InputDecorations from "../Input/InputDecorations";

export default {
  title: "Select",
};

export const select = () => {
  const [value, setValue] = React.useState("");
  return (
    <Card maxWidth={500} mx="auto" p="xl">
      <Select
        value={value}
        placeholder="Choose a number"
        onChange={e => setValue(e.target.value)}
      >
        <option>One</option>
        <option>Two</option>
        <option>Three</option>
        <option>Four</option>
      </Select>
    </Card>
  );
};

export const withPrefix = () => {
  const [value, setValue] = React.useState("Europe/Dublin");
  return (
    <Card maxWidth={500} mx="auto" p="xl">
      <InputDecorations prefix={<label htmlFor="timezone">Timezone</label>}>
        <Select
          id="timezone"
          value={value}
          onChange={e => setValue(e.target.value)}
        >
          <option>Europe/Dublin</option>
          <option>America/New_York</option>
          <option>America/Chicago</option>
        </Select>
      </InputDecorations>
    </Card>
  );
};
