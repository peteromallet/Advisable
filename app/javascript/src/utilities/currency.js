import Dinero from "dinero.js";

const defaultOptions = {
  format: "$0,0",
};

export default (amount = 0, options = {}) => {
  // Dinero expects an int not a float. There are rare cases when a float may
  // be passed in. (e.g an old application rate from airtable). In these cases
  // we want to round up the decimal.
  let asNumber = Math.ceil(Number(amount || 0));

  const dinero = new Dinero({ currency: "USD", amount: asNumber });
  const opts = { ...defaultOptions, ...options };
  return dinero.toFormat(opts.format);
};

// Takes a string (usually from an input) and converts it to a currency in the smallest unit
// e.g "35.50" = 3500
export const stringToCurrency = (string) => {
  const asFloat = parseFloat(string);
  return parseInt(asFloat * 100);
};

// Takes a currency in smallest unit and converts it to a string. Usually used to get the
// initial value for a currency input.
// e.g 3500 = "35.50"
export const currencyToString = (currency) => {
  return String(currency / 100);
};
