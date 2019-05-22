import React from "react";
import { storiesOf } from "@storybook/react";
import SegmentedControl from "./";
import Card from "../Card";
import Padding from "../Spacing/Padding";

storiesOf("SegmentedControl", module).add("default", () => {
  return React.createElement(() => {
    const [value, setValue] = React.useState("Strict");

    const handleChange = e => {
      console.log(e.target.value);
      setValue(e.target.value);
    };

    return (
      <Padding size="xl">
        <Card>
          <Padding size="xl">
            <SegmentedControl
              value={value}
              onChange={handleChange}
              options={[
                { value: "Strict", label: "Strict" },
                { value: "Flexible", label: "Flexible" },
                { value: "Random", label: "Random" },
              ]}
            />
          </Padding>
        </Card>
      </Padding>
    );
  });
});
