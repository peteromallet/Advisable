import Dinero from "dinero.js";

const defaultOptions = {
  format: "$0,0.00",
};

export default (amount = 0, options = {}) => {
  const dinero = new Dinero({ currency: "USD", amount: parseInt(amount || 0) });
  const opts = { ...defaultOptions, ...options };
  return dinero.toFormat(opts.format);
};
