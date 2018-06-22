import React from "react";
import Flex from "src/components/Flex";
import { Type } from "./styles";

export default () => (
  <Flex distribute="fillEvenly" spacing='l'>
    <Type>
      <input type="radio" name="type" id="fixed" />
      <label htmlFor="fixed">
        <strong>Fixed</strong>
        <small>Based on a set of deliverables</small>
      </label>
    </Type>

    <Type>
      <input type="radio" name="type" id="recurring" />
      <label htmlFor="recurring">
        <strong>Recurring</strong>
        <small>Extends over a number of months</small>
      </label>
    </Type>
  </Flex>
);
