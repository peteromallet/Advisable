import React from "react";
import { storiesOf } from "@storybook/react";
import Radio from "./";
import Card from "../Card";
import Padding from "../Spacing/Padding";

storiesOf("Radio", module)
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
              <Padding bottom="l">
                <Radio
                  label="Option One"
                  value="Option One"
                  onChange={handleChange}
                  checked={value === "Option One"}
                />
              </Padding>
              <Padding bottom="l">
                <Radio
                  label="Option Two"
                  value="Option Two"
                  onChange={handleChange}
                  checked={value === "Option Two"}
                  description="This is a radio description"
                />
              </Padding>
              <Radio
                label="Option Three"
                value="Option Three"
                onChange={handleChange}
                checked={value === "Option Three"}
              />
            </Padding>
          </Card>
        </Padding>
      );
    });
  })
  .add("bordered", () => {
    return React.createElement(() => {
      const [value, setValue] = React.useState("");

      const handleChange = e => {
        setValue(e.target.value);
      };

      return (
        <Padding size="xl">
          <Card>
            <Padding size="xl">
              <Padding bottom="s">
                <Radio
                  label="Option One"
                  value="Option One"
                  variation="bordered"
                  onChange={handleChange}
                  checked={value === "Option One"}
                />
              </Padding>
              <Padding bottom="s">
                <Radio
                  label="Option Two"
                  value="Option Two"
                  variation="bordered"
                  onChange={handleChange}
                  checked={value === "Option Two"}
                  description="This is a radio description"
                />
              </Padding>
              <Radio
                label="Option Three"
                value="Option Three"
                variation="bordered"
                onChange={handleChange}
                checked={value === "Option Three"}
              />
            </Padding>
          </Card>
        </Padding>
      );
    });
  });
