import React from "react";
import Select from "./";
import Card from "../Card";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

export default {
  title: 'Forms/Select',
  decorators: [withKnobs],
};

export const basic = () => {
  const [value, setValue] = React.useState(null);
  const prefix = text("Prefix", null);
  const suffix = text("Suffix", null);
  const disabled = boolean("Disabled", false);
  const error = boolean("Error", false);
  const size = select("Size", ["sm", "md", "lg"], "md");

  return (
    <Card marginTop="l" padding="xl" maxWidth={500} mx="auto">
      <Select
        size={size}
        error={error}
        prefix={prefix}
        suffix={suffix}
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Select something"
      >
        <option>Red</option>
        <option>Blue</option>
        <option>Orange</option>
        <option>Purple</option>
      </Select>
    </Card>
  );
};
