import React from "react";
import { Text } from "@advisable/donut";
import InputError from "src/components/InputError";
import { Choices, Choice, Circle } from "./styles";

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
            <Circle />
            <Text size="xs" color="neutral.8" weight="medium" mb="xxs">
              {choice.name}
            </Text>
            <Text size="xs" color="neutral.5" lineHeight="xs">
              {choice.description}
            </Text>
          </label>
        </Choice>
      ))}
    </Choices>
    {error && <InputError>{error}</InputError>}
  </React.Fragment>
);
