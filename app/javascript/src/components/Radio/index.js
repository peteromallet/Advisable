import React from "react";
import { uniqueId } from "lodash-es";
import InputDescription from "../InputDescription";
import { Radio as RadioStyles, Label, Input, Value, Circle } from "./styles";

const Radio = ({ label, description, variation, ...rest }) => {
  const [id, _] = React.useState(rest.id || uniqueId("radio"));

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
