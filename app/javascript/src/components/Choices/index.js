import React from "react";
import { Text } from "@advisable/donut";
import { Choices, Choice, Circle } from "./styles";

export default ({ choices, name, value, onChange, error }) => (
  <>
    <Choices>
      {choices.map((choice) => (
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
            <Text size="xs" color="neutral800" weight="medium">
              {choice.name}
            </Text>
            {choice.description && (
              <Text size="xs" color="neutral500" lineHeight="xs" mt="xxs">
                {choice.description}
              </Text>
            )}
          </label>
        </Choice>
      ))}
    </Choices>
    {error && (
      <Text size="xs" color="red500" mt="xs" lineHeight="xs">
        {error}
      </Text>
    )}
  </>
);
