import React from "react";
import { isObject } from "lodash";
import InputLabel from "../InputLabel";
import InputError from "../InputError";
import InputDescription from "../InputDescription";
import { Choices, Choice, Circle, Label } from "./styles";

const ChoiceList = ({
  name,
  label,
  value,
  options = [],
  onChange,
  fullWidth,
  description,
  optionsPerRow,
  error
}) => {
  return (
    <React.Fragment>
      {label && <InputLabel>{label}</InputLabel>}
      <Choices fullWidth={fullWidth} optionsPerRow={optionsPerRow}>
        {options.map(option => (
          <Choice key={isObject(option) ? option.value : option}>
            <input
              name={name}
              type="radio"
              id={
                isObject(option) ? option.value.toString() : option.toString()
              }
              onChange={onChange}
              value={isObject(option) ? option.value : option}
              checked={value === (isObject(option) ? option.value : option)}
            />
            <label
              htmlFor={(isObject(option) ? option.value : option).toString()}
            >
              <Circle />
              <Label>{isObject(option) ? option.label : option}</Label>
            </label>
          </Choice>
        ))}
      </Choices>
      {description && <InputDescription>{description}</InputDescription>}
      {error && <InputError>{error}</InputError>}
    </React.Fragment>
  );
};

export default ChoiceList;
