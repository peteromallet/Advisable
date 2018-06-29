import React from "react";
import { Field } from "formik";
import Flex from "src/components/Flex";
import { Type } from "./styles";

export default () => (
  <Flex distribute="fillEvenly" spacing="l">
    <Type>
      <Field
        name="type"
        render={({ field }) => (
          <input
            {...field}
            type="radio"
            id="fixed"
            value="fixed"
            checked={field.value === "fixed"}
          />
        )}
      />
      <label htmlFor="fixed">
        <strong>Fixed</strong>
        <small>Based on a set of deliverables</small>
      </label>
    </Type>

    <Type>
      <Field
        name="type"
        render={({ field }) => (
          <input
            {...field}
            type="radio"
            id="recurring"
            value="recurring"
            checked={field.value === "recurring"}
          />
        )}
      />
      <label htmlFor="recurring">
        <strong>Recurring</strong>
        <small>Extends over a number of months</small>
      </label>
    </Type>
  </Flex>
);
