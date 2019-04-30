import React from "react";
import { storiesOf } from "@storybook/react";
import Popover from "./";
import Card from "../Card";
import Padding from "../Spacing/Padding";

storiesOf("Popover", module).add("Basic", () =>
  React.createElement(() => {
    return (
      <Padding size="l">
        <Card>
          <Padding size="l">
            <Popover trigger={<button>Open Popover</button>}>
              Testing
            </Popover>
          </Padding>
        </Card>
      </Padding>
    );
  })
);
