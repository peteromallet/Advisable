import React from "react";
import { storiesOf } from "@storybook/react";
import FieldGroup from "./";
import Card from "../Card";
import TextField from "../TextField";
import Padding from "../Spacing/Padding";

storiesOf("FieldGroup", module).add("default", () => {
  return React.createElement(() => {
    const [a, setA] = React.useState("");
    const [b, setB] = React.useState("");

    const handleChangeA = e => {
      setA(e.target.value);
    };

    const handleChangeB = e => {
      setB(e.target.value);
    };

    return (
      <Padding size="xl">
        <Card>
          <Padding size="xl">
            <FieldGroup spacing="m">
              <TextField
                value={a}
                placeholder="First field.."
                onChange={handleChangeA}
              />
              <TextField
                value={b}
                placeholder="Second field.."
                onChange={handleChangeB}
              />
            </FieldGroup>
          </Padding>
        </Card>
      </Padding>
    );
  });
});
