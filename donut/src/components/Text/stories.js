import React from "react";
import { storiesOf } from "@storybook/react";
import Text from ".";
import Spacing from "../Spacing";

storiesOf("Text", module).add("Basic", () =>
  React.createElement(() => {
    return (
      <div style={{ width: 550, margin: "50px auto " }}>
        <Spacing bottom="m">
          <Text size="xxl" weight="semibold" multiline>
            The quick brown fox jumps over the lazy dog.
          </Text>
        </Spacing>

        <Text multiline>
          The quick brown fox jumps over the lazy dog. The quick brown fox jumps
          over the lazy dog. The quick brown fox jumps over the lazy dog. The
          quick brown fox jumps over the lazy dog.
        </Text>
      </div>
    );
  })
);
