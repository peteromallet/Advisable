import Dinero from "dinero.js";

const defaultOptions = {
  format: "$0,0",
};

const isFloat = n => n % 1 !== 0;

export default (amount = 0, options = {}) => {
  // Dinero expects an int not a float. There are rare cases when a float may
  // be passed in. (e.g an old application rate from airtable). In these cases
  // we want to round up the decimal.
  let asNumber = Math.ceil(Number(amount || 0));

  const dinero = new Dinero({ currency: "USD", amount: asNumber });
  const opts = { ...defaultOptions, ...options };
  return dinero.toFormat(opts.format);
};
