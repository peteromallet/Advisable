import React from "react";
import { storiesOf } from "@storybook/react";
import Text from ".";

storiesOf("Text", module).add("Basic", () =>
  React.createElement(() => {
    return (
      <div style={{ width: 550, margin: "50px auto " }}>
        <Text
          mb="m"
          size="xxl"
          weight="semibold"
          color={{ _: "blue.5", l: "red.5" }}
        >
          The quick brown fox jumps over the lazy dog.
        </Text>

        <Text lineHeight="m">
          The quick brown fox jumps over the lazy dog. The quick brown fox jumps
          over the lazy dog. The quick brown fox jumps over the lazy dog. The
          quick brown fox jumps over the lazy dog.
        </Text>
      </div>
    );
  })
);
