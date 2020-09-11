import React from "react";
import Textarea from "./";
import Card from "../Card";
import { withKnobs, boolean, select, number } from "@storybook/addon-knobs";

export default {
  title: 'Forms/Textarea',
  decorators: [withKnobs],
};

export const basic = () => {
  const [value, setValue] = React.useState(null);
  const disabled = boolean("Disabled", false);
  const error = boolean("Error", false);
  const size = select("Size", ["sm", "md", "lg"], "md");
  const maxRows = number("Max Rows", 8);
  const minRows = number("Min Rows", 2);

  return (
    <Card marginTop="l" padding="xl" maxWidth={500} mx="auto">
      <Textarea
        size={size}
        error={error}
        disabled={disabled}
        maxRows={maxRows}
        minRows={minRows}
        placeholder="Type something"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Card>
  );
};
