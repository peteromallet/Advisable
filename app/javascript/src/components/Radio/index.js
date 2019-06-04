import React from "react";
import unqiueId from "lodash/uniqueId";
import InputDescription from "../InputDescription";
import { Radio as RadioStyles, Label, Input, Value, Circle } from "./styles";

const Radio = ({ label, description, variation, ...rest }) => {
  const [id, _] = React.useState(rest.id || unqiueId("radio"));

  return (
    <RadioStyles>
      <Input type="radio" {...rest} id={id} />
      <Label variation={variation} htmlFor={id}>
        <Circle />
        <Value>{label}</Value>
        {description && <InputDescription>{description}</InputDescription>}
      </Label>
    </RadioStyles>
  );
};

export default Radio;
