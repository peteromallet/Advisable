import React from "react";
import { useFormikContext } from "formik";
import currency from "src/utilities/currency";
import CurrencyInput from "src/components/CurrencyInput";
import priceInputProps from "src/utilities/priceInputProps";

export default {
  render: function RenderCurrency({ record, field }) {
    return record[field.name] ? currency(record[field.name]) : null;
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name] || undefined;
  },
  input: function CurrencyAttributeInput({ attribute, record }) {
    const formik = useFormikContext();

    return <CurrencyInput {...priceInputProps(formik, attribute.name)} />;
  },
};
