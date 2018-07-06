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
            id="Fixed"
            value="Fixed"
            checked={field.value === "Fixed"}
          />
        )}
      />
      <label htmlFor="Fixed">
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
            id="Recurring"
            value="Recurring"
            checked={field.value === "Recurring"}
          />
        )}
      />
      <label htmlFor="Recurring">
        <strong>Recurring</strong>
        <small>Extends over a number of months</small>
      </label>
    </Type>
  </Flex>
);
