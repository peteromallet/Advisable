import React from "react";
import { storiesOf } from "@storybook/react";
import Text from ".";
import Padding from "../Padding";

storiesOf("Text", module).add("Basic", () =>
  React.createElement(() => {
    return (
      <div style={{ width: 550, margin: "50px auto " }}>
        <Padding bottom="m">
          <Text size="xxl" weight="semibold" multiline>
            The quick brown fox jumps over the lazy dog.
          </Text>
        </Padding>

        <Text multiline>
          The quick brown fox jumps over the lazy dog. The quick brown fox jumps
          over the lazy dog. The quick brown fox jumps over the lazy dog. The
          quick brown fox jumps over the lazy dog.
        </Text>
      </div>
    );
  })
);
