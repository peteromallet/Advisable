import React from "react";
import { storiesOf } from "@storybook/react";
import Flex from ".";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 60px;
  background: red;
  border-radius: 6px;
`;

storiesOf("Flex", module).add("Basic", () =>
  React.createElement(() => {
    return (
      <div style={{ width: 550, margin: "50px auto" }}>
        <Flex distribute="evenly" spacing="xs">
          <Box />
          <Box />
          <Box />
        </Flex>
      </div>
    );
  })
);

storiesOf("Flex", module).add("Vertical", () => {
  return React.createElement(() => {
    return (
      <div style={{ width: 550, margin: "50px auto" }}>
        <Flex fill="evenly" spacing="xs" direction="vertical">
          <Box />
          <Box />
          <Box />
        </Flex>
      </div>
    );
  });
});

storiesOf("Flex", module).add("Responsive props", () =>
  React.createElement(() => {
    return (
      <div style={{ width: 550, margin: "50px auto" }}>
        <Flex distribute="evenly" spacing={{ all: "xl", s: "xs", m: "m" }}>
          <Box />
          <Box />
          <Box />
        </Flex>
      </div>
    );
  })
);
