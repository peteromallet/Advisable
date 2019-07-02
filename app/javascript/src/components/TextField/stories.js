import React from "react";
import { storiesOf } from "@storybook/react";
import TextField from "./";
import Card from "../Card";
import Padding from "../Spacing/Padding";

storiesOf("TextField", module)
  .add("default", () => {
    return React.createElement(() => {
      const [value, setValue] = React.useState("");

      const handleChange = e => {
        setValue(e.target.value);
      };

      return (
        <Padding size="xl">
          <Card>
            <Padding size="xl">
              <TextField value={value} onChange={handleChange} />
            </Padding>
          </Card>
        </Padding>
      );
    });
  })
  .add("with prefix", () => {
    return React.createElement(() => {
      const [value, setValue] = React.useState("");

      const handleChange = e => {
        setValue(e.target.value);
      };

      return (
        <Padding size="xl">
          <Card>
            <Padding size="xl">
              <TextField
                size="s"
                prefix="From"
                value={value}
                onChange={handleChange}
              />
            </Padding>
          </Card>
        </Padding>
      );
    });
  });
