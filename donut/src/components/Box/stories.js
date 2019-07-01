import React from "react";
import { storiesOf } from "@storybook/react";
import Box from ".";

storiesOf("Box", module).add("Basic", () =>
  React.createElement(() => {
    return (
      <div style={{ width: 550, margin: "50px auto" }}>
        <Box color="blue.5">test</Box>
      </div>
    );
  })
);
