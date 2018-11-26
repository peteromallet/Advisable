import React, { useState } from "react";
import { CardElement } from "react-stripe-elements";
import { Field } from "./styles";

const CardInput = ({ onChange }) => {
  const [focused, setFocus] = useState(false);

  return (
    <Field focused={focused}>
      <CardElement
        onChange={onChange}
        style={{ base: { fontSize: "16px" } }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </Field>
  );
};

export default CardInput;
