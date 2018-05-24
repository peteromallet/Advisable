const symbols = {
  'USD': '$', // US Dollar
  'EUR': '€', // Euro
  'GBP': '£', // British Pound Sterling
  'JPY': '¥', // Japanese Yen
  'PHP': '₱', // Philippine Peso
}

export default (amount, currency) => {
  const symbol = symbols[currency] || currency;
  return `${symbol}${amount}`
}
