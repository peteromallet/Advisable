import React from "react";
import { Input } from "@advisable/donut";

const NUMBER_REGEX = /^\d+$/;
function CurrencyInput(props) {
  const handleChange = (e) => {
    const value = e.target.value;

    if (value && !NUMBER_REGEX.test(value)) {
      e.preventDefault();
      return;
    }

    props.onChange(e);
  };

  return <Input {...props} onChange={handleChange} />;
}

export default CurrencyInput;
