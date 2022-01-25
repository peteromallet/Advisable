import React, { useState } from "react";
import { useField } from "formik";
import Dinero from "dinero.js";
import { Input } from "@advisable/donut";
import currency from "src/utilities/currency";

const CURRENCY_REGEX = /^[0-9,]+\.?(\d{1,2})?$/;

export default {
  render: function RenderCurrency({ record, attribute }) {
    return record[attribute.name]
      ? currency(record[attribute.name], {
          format: "$0,0.00",
        })
      : null;
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name] || undefined;
  },
  input: function CurrencyAttributeInput({ attribute }) {
    const [field, , { setValue }] = useField(attribute.name);
    const [inputValue, setInputValue] = useState(
      field.value ? Dinero({ amount: field.value }).toFormat("0,0.00") : "",
    );

    const handleChange = (e) => {
      const nextInputValue = e.target.value;

      if (nextInputValue && !CURRENCY_REGEX.test(nextInputValue)) {
        e.preventDefault();
        return;
      }

      const stripped = nextInputValue.replace(/[^0-9.-]+/g, "");
      const value = stripped ? Number(stripped) * 100 : undefined;
      setValue(value);
      setInputValue(nextInputValue);
    };

    return <Input prefix="$" value={inputValue} onChange={handleChange} />;
  },
};
