import React, { useState } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import { Field } from "./styles";

const PaymentDetails = () => {
  const [focused, setFocus] = useState(false);

  return (
    <Field focused={focused}>
      <CardElement
        style={{ base: { fontSize: "16px" } }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </Field>
  );
};

export default injectStripe(PaymentDetails);
