import React from "react";
import { storiesOf } from "@storybook/react";
import Button from ".";
import Flex from "../Flex";
import Padding from "../Padding";

storiesOf("Button", module).add("Basic", () =>
  React.createElement(() => {
    return (
      <div style={{ width: 550, margin: "50px auto" }}>
        <Padding bottom="xs">
          <Flex distribute="evenly" spacing="xs">
            <Button
              width="100%"
              intent="success"
              icon="user-check"
              appearance="primary"
            >
              Start working with John
            </Button>
            <Button intent="success" width="100%" icon="message-circle">
              Message John
            </Button>
          </Flex>
        </Padding>
        <Flex distribute="evenly" spacing="xs">
          <Button width="100%" icon="award">
            Request References
          </Button>
          <Button width="100%" icon="trash">
            Provide Feedback
          </Button>
        </Flex>
      </div>
    );
  })
);
