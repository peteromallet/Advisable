import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Flex from "./";

const Container = styled.div`
  width: 400px;
  height: 400px;
`

const Box = styled.div`
  height: 100%;
  margin: 5px;
  min-width: 100px;
  min-height: 50px;
  background: #eee;
  border-radius: 5px;
`;

storiesOf("Flex", module).add("default", () => (
  <Container>
  <Flex vertical>
    <Box />
    <Flex.Item distribute="fill">
      <Box />
    </Flex.Item>
    <Box />
  </Flex>
  </Container>
));
