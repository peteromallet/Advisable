import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import Card from "../Card";
import Autocomplete from "./";

export default {
  title: "Autocomplete",
  decorators: [withKnobs],
};

export const singleSelect = () => {
  const [value, setValue] = React.useState("");

  return (
    <Card maxWidth={600} margin="50px auto" padding="l">
      <Autocomplete
        label="Choose a color"
        placeholder="Select a color"
        onChange={v => setValue(v.value)}
        options={[
          { value: "Red", label: "Red" },
          { value: "Yellow", label: "Yellow" },
        ]}
      />
    </Card>
  );
};
