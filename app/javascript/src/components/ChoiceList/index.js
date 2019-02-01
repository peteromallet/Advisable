import React from "react";
import InputLabel from "../InputLabel";
import { Choices, Choice, Circle, Label } from "./styles";

const ChoiceList = ({ name, label, value, options, onChange }) => {
  return (
    <React.Fragment>
      {label && <InputLabel>{label}</InputLabel>}
      <Choices>
        {options.map(option => (
          <Choice key={option.value}>
            <input
              name={name}
              type="radio"
              id={option.value.toString()}
              onChange={onChange}
              value={option.value}
              checked={value === option.value}
            />
            <label htmlFor={option.value.toString()}>
              <Circle />
              <Label>{option.label}</Label>
            </label>
          </Choice>
        ))}
      </Choices>
    </React.Fragment>
  );
};

export default ChoiceList;
