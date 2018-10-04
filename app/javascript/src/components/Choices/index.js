import React from "react";
import { Field } from "formik";
import Flex from "src/components/Flex";
import InputError from "src/components/InputError";
import { Choices, Choice } from "./styles";

export default ({ choices, name, value, onChange, error }) => (
  <React.Fragment>
    <Choices>
      {choices.map(choice => (
        <Choice key={choice.value}>
          <input
            name={name}
            type="radio"
            id={choice.value}
            onChange={onChange}
            value={choice.value}
            checked={value === choice.value}
          />
          <label htmlFor={choice.value}>
            <strong>{choice.name}</strong>
            <small>{choice.description}</small>
          </label>
        </Choice>
      ))}
    </Choices>
    {error && <InputError>{error}</InputError>}
  </React.Fragment>
);
