import React, { useState } from "react";
import { useField } from "formik";
import Dinero from "dinero.js";
import { Input } from "@advisable/donut";
import currency from "src/utilities/currency";

const CURRENCY_REGEX = /^-?[\d,]+\.?(\d\d?)?$/;

function convertToCents(inputValue) {
  const decimalPlaces = inputValue.split(".")[1]?.length || 0;
  const stripped = inputValue.replace(/[^\d]/g, "");
  if (!stripped) return undefined;

  const asNumber = Number(stripped);
  switch (decimalPlaces) {
    case 0:
      return asNumber * 100;
    case 1:
      return asNumber * 10;
    default:
      return asNumber;
  }
}

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

      const value = convertToCents(nextInputValue);
      setValue(value);
      setInputValue(nextInputValue);
    };

    return <Input prefix="$" value={inputValue} onChange={handleChange} />;
  },
};
