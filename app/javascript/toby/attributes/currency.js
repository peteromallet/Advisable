import currency from "src/utilities/currency";

export default {
  render: function RenderCurrency({ record, field }) {
    return record[field.name] ? currency(record[field.name]) : null;
  },
  input: function CurrencyInput() {
    return null;
  },
};
