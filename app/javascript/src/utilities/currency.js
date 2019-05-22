import Dinero from "dinero.js";

const defaultOptions = {
  format: "$0,0.00",
};

export default (amount, options = {}) => {
  const dinero = new Dinero({ currency: "USD", amount });
  const opts = { ...defaultOptions, ...options };
  return dinero.toFormat(opts.format);
};
